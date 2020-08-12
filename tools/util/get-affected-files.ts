// 参考 https://github.com/nrwl/nx/blob/master/packages/workspace/src/command-line/format.ts

import { statSync } from 'fs-extra';
import { flattenDeep } from 'lodash';
import path from 'path';
import { Arguments } from 'yargs';

import { getProjectRoots, parseFiles } from '@nrwl/workspace/src/command-line/shared';
import { NxArgs, splitArgsIntoNxArgsAndOverrides } from '@nrwl/workspace/src/command-line/utils';
import { filterAffected } from '@nrwl/workspace/src/core/affected-project-graph';
import { calculateFileChanges } from '@nrwl/workspace/src/core/file-utils';
import { createProjectGraph } from '@nrwl/workspace/src/core/project-graph';

const PRETTIER_EXTENSIONS = ['ts', 'js', 'tsx', 'jsx', 'scss', 'less', 'css', 'html', 'json', 'md', 'mdx'];

/**
 * 文件是否存在
 * @param filePath 文件路径
 */
function isFileExists(filePath: string): boolean {
  try {
    return statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

function getPatterns(args: NxArgs & { libsAndApps: boolean; _: string[] }) {
  const allFilesPattern = [`"**/*.{${PRETTIER_EXTENSIONS.join(',')}}"`];

  try {
    if (args.all) {
      return allFilesPattern;
    }

    const p = parseFiles(args);
    const patterns = p.files
      .filter(f => isFileExists(f))
      .filter(f => PRETTIER_EXTENSIONS.map(ext => '.' + ext).includes(path.extname(f)));

    const libsAndApp = args.libsAndApps;
    return libsAndApp ? getPatternsFromApps(patterns) : patterns.map(f => `"${f}"`);
  } catch (e) {
    return allFilesPattern;
  }
}

function getPatternsFromApps(affectedFiles: string[]): string[] {
  const graph = createProjectGraph();
  const affectedGraph = filterAffected(graph, calculateFileChanges(affectedFiles));
  const roots = getProjectRoots(Object.keys(affectedGraph.nodes));
  return roots.map(root => `"${root}/**/*.{${PRETTIER_EXTENSIONS.join(',')}}"`);
}

function chunkify(target: string[], size: number): string[][] {
  return target.reduce((current: string[][], value: string, index: number) => {
    if (index % size === 0) current.push([]);
    current[current.length - 1].push(value);
    return current;
  }, []);
}

/**
 * 获取受影响的文件
 */
export const getAffectedFiles = async (args: Arguments) => {
  let patterns: string[];
  const { nxArgs } = splitArgsIntoNxArgsAndOverrides(args, 'affected');
  try {
    patterns = getPatterns({
      ...args,
      ...nxArgs
    } as any);
  } catch (e) {
    console.error('command', e.message);
    process.exit(1);
  }
  const chunkList: string[][] = chunkify(patterns, 50);
  return flattenDeep(chunkList).map(d => d.replace(/"/g, ''));
};

// 参考 https://github.com/nrwl/nx/blob/master/packages/workspace/src/command-line/format.ts

import { statSync } from 'fs-extra';
import { flattenDeep } from 'lodash';
import path from 'path';
import { Arguments } from 'yargs';

import { getProjectRoots, parseFiles } from '@nrwl/workspace/src/command-line/shared';
import { NxArgs, splitArgsIntoNxArgsAndOverrides } from '@nrwl/workspace/src/command-line/utils';
import { filterAffected } from '@nrwl/workspace/src/core/affected-project-graph';
import { calculateFileChanges } from '@nrwl/workspace/src/core/file-utils';
import { createProjectGraph, onlyWorkspaceProjects } from '@nrwl/workspace/src/core/project-graph';

const PRETTIER_EXTENSIONS = ['ts', 'js', 'tsx', 'jsx', 'scss', 'less', 'css', 'html', 'json', 'md', 'mdx'];

const MATCH_ALL_PATTERN = `**/*.{${PRETTIER_EXTENSIONS.join(',')}}`;

function fileExists(filePath: string): boolean {
  try {
    return statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

function getPatterns(args: NxArgs & { libsAndApps: boolean; _: string[] }) {
  const allFilesPattern = [MATCH_ALL_PATTERN];

  try {
    if (args.all) {
      return allFilesPattern;
    }

    const p = parseFiles(args);
    const patterns = p.files
      .filter(f => fileExists(f))
      .filter(f => PRETTIER_EXTENSIONS.map(ext => '.' + ext).includes(path.extname(f)));

    return args.libsAndApps ? getPatternsFromApps(patterns) : patterns;
  } catch (e) {
    return allFilesPattern;
  }
}

function getPatternsFromApps(affectedFiles: string[]): string[] {
  const graph = onlyWorkspaceProjects(createProjectGraph());
  const affectedGraph = filterAffected(graph, calculateFileChanges(affectedFiles));
  const roots = getProjectRoots(Object.keys(affectedGraph.nodes));
  return roots.map(root => `${root}/${MATCH_ALL_PATTERN}`);
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

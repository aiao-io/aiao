import { execSync } from 'child_process';
import { statSync } from 'fs-extra';
import { flattenDeep } from 'lodash';
import path from 'path';
import resolve from 'resolve';
import { Arguments } from 'yargs';

import { getProjectRoots, parseFiles } from '@nrwl/workspace/src/command-line/shared';
import { NxArgs, splitArgsIntoNxArgsAndOverrides } from '@nrwl/workspace/src/command-line/utils';
import { filterAffected } from '@nrwl/workspace/src/core/affected-project-graph';
import { calculateFileChanges } from '@nrwl/workspace/src/core/file-utils';
import { createProjectGraph } from '@nrwl/workspace/src/core/project-graph';

const PRETTIER_EXTENSIONS = ['ts', 'js', 'tsx', 'jsx', 'scss', 'less', 'css', 'html', 'json', 'md', 'mdx'];

export function fileExists(filePath: string): boolean {
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
      .filter(f => fileExists(f))
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

function write(patterns: string[]) {
  if (patterns.length > 0) {
    execSync(`node "${prettierPath()}" --write ${patterns.join(' ')}`, {
      stdio: [0, 1, 2]
    });
  }
}

function check(patterns: string[]) {
  if (patterns.length > 0) {
    try {
      execSync(`node "${prettierPath()}" --list-different ${patterns.join(' ')}`, {
        stdio: [0, 1, 2]
      });
    } catch (e) {
      process.exit(1);
    }
  }
}

function prettierPath() {
  const basePath = path.dirname(resolve.sync('prettier', { basedir: __dirname }));
  return path.join(basePath, 'bin-prettier.js');
}

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

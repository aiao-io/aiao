import { Tree } from '@angular-devkit/schematics';
import { getNpmScope, readJsonInTree } from '@nrwl/workspace';

import { isNxWorkspace } from './is-nx';

function toFileName(s: string): string {
  return s
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .toLowerCase()
    .replace(/[ _]/g, '-');
}
export interface NormalizedSchema {
  name: string;
  scope: string;
  isNx: boolean;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
  directory?: string;
  tags?: string;
}

export interface BaseSchema {
  name: string;
  directory?: string;
  tags?: string;
}

export const normalizeOptions = <Schema extends BaseSchema>(host: Tree, options: Schema): NormalizedSchema & Schema => {
  const isNx = isNxWorkspace(host);
  const name = toFileName(options.name);
  const scope = isNx ? getNpmScope(host) : '';
  const angularConfig = readJsonInTree(host, '/angular.json');
  const libs = isNx ? 'libs' : angularConfig.newProjectRoot;
  const projectDirectory = options.directory ? `${toFileName(options.directory)}/${name}` : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${libs}/${projectDirectory}`;

  const parsedTags = options.tags ? options.tags.split(',').map(s => s.trim()) : [];

  return {
    ...options,
    scope,
    isNx,
    name: projectName,
    projectRoot,
    projectDirectory,
    parsedTags
  };
};

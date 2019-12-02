import { join, normalize, Path } from '@angular-devkit/core';
import {
  apply,
  chain,
  externalSchematic,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';

import { Schema } from './schema';

interface NormalizedSchema extends Schema {
  name: string;
  fileName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function toFileName(s: string): string {
  return s
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .toLowerCase()
    .replace(/[ _]/g, '-');
}

function normalizeOptions(host: Tree, options: Schema): NormalizedSchema {
  const name = toFileName(options.name);
  const projectDirectory = options.directory ? `${toFileName(options.directory)}/${name}` : name;

  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const fileName = options.simpleModuleName ? name : projectName;
  const projectRoot = `libs/${projectDirectory}`;

  const parsedTags = options.tags ? options.tags.split(',').map(s => s.trim()) : [];

  return {
    ...options,
    name: projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    fileName
  };
}

export default function(schema: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const options = normalizeOptions(host, schema);

    console.log('options', options);
    return chain([])(host, context);
  };
}

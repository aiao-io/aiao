import { chain, Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson, addPackageWithInit, formatFiles, updateJsonInTree } from '@nrwl/workspace';

import { Schema } from './schema';

function addDependencies(schema: Schema): Rule {
  const devDeps = {
    '@stencil/core': '^1.11.0',
    '@stencil/sass': '^1.1.1',
    'tslint-ionic-rules': '^0.0.21',
    'tslint-react': '^4.2.0'
  };
  return addDepsToPackageJson({}, devDeps);
}

function moveDependency(): Rule {
  return updateJsonInTree('package.json', json => {
    json.dependencies = json.dependencies || {};
    delete json.dependencies['@stencil/core'];
    return json;
  });
}

export default function(schema: Schema) {
  return chain([addPackageWithInit('@nrwl/jest'), addDependencies(schema), moveDependency(), formatFiles(schema)]);
}

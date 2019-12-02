import { chain, Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson, addPackageWithInit, formatFiles, updateJsonInTree } from '@nrwl/workspace';

import { Schema } from './schema';

function addDependencies(schema: Schema): Rule {
  let deps = {};
  const devDeps = {
    '@stencil/core': '^1.8.1',
    '@stencil/sass': '^1.1.1',
    'tslint-ionic-rules': '^0.0.21',
    'tslint-react': '^4.0.0'
  };
  if (schema.vendors.ionic) {
    deps = { ...deps, '@ionic/core': '^4.11.3' };
  }
  return addDepsToPackageJson(deps, devDeps);
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

import { chain, Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson, addPackageWithInit, formatFiles, updateJsonInTree } from '@nrwl/workspace';

interface Schema {
  skipFormat: boolean;
}

function addDependencies(): Rule {
  const devDeps = {
    '@stencil/core': '^2.0.0',
    '@stencil/sass': '^1.3.1',
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

export default function (schema: Schema) {
  return chain([addPackageWithInit('@nrwl/jest'), addDependencies(), moveDependency(), formatFiles(schema)]);
}

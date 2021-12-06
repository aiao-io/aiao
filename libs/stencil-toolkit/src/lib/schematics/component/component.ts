import { join } from 'path';

import { strings } from '@angular-devkit/core';
import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url
} from '@angular-devkit/schematics';
import { getNpmScope, readJsonInTree, toFileName } from '@nrwl/workspace';

import { isNxWorkspace } from '../../util/is-nx';
import { NormalizedSchema } from '../../util/normalize-options';

interface Schema extends NormalizedSchema {
  name: string;
  project: string;
}

export default function (schema: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const { name: sName, project } = schema;
    const isNx = isNxWorkspace(tree);
    const name = toFileName(sName);
    const scope = isNx ? getNpmScope(tree) : '';
    const angularConfig = readJsonInTree(tree, '/angular.json');
    const libs = isNx ? 'libs' : angularConfig.newProjectRoot;
    const projectRoot = `${libs}/${project}`;
    return chain([
      mergeWith(
        apply(url('./files'), [
          applyTemplates({
            ...schema,
            name,
            scope,
            ...strings
          }),
          move(join(projectRoot, 'src/lib/components', name))
        ])
      )
    ])(tree, context);
  };
}

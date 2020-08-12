import { join, normalize } from '@angular-devkit/core';
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
import { formatFiles, generateProjectLint, Linter, updateJsonInTree, updateWorkspaceInTree } from '@nrwl/workspace';

import { NormalizedSchema, normalizeOptions } from '../../util/normalize-options';
import init from '../init/init';

interface Schema extends NormalizedSchema {
  name: string;
  directory?: string;
  style?: string;
  tags?: string;
  unitTestRunner?: any;
}

function updateLibPackageNpmScope(options: Schema): Rule {
  const { projectRoot, name, scope } = options;
  return () => {
    return updateJsonInTree(`${projectRoot}/package.json`, json => {
      json.name = options.scope ? `@${scope}/${name}` : name;
      return json;
    });
  };
}

function getBuildConfig(options: Schema) {
  return {
    builder: '@aiao/stencil-toolkit:build',
    options: {
      outputPath: join(normalize('dist'), options.projectRoot),
      config: `${options.projectRoot}/stencil.config.ts`
    }
  };
}

function getServeConfig(options: Schema) {
  return {
    builder: '@aiao/stencil-toolkit:serve',
    options: {
      config: `${options.projectRoot}/stencil.config.ts`
    }
  };
}

function updateWorkspaceJson(options: Schema): Rule {
  return updateWorkspaceInTree(workspaceJson => {
    const project = {
      root: options.projectRoot,
      sourceRoot: join(options.projectRoot as any, 'src'),
      projectType: 'library',
      schematics: {},
      architect: <any>{}
    };

    project.architect.build = getBuildConfig(options);
    project.architect.serve = getServeConfig(options);
    project.architect.lint = generateProjectLint(
      normalize(project.root),
      join(normalize(project.root), 'tsconfig.lib.json'),
      Linter.TsLint
    );

    workspaceJson.projects[options.name] = project;
    workspaceJson.defaultProject = workspaceJson.defaultProject || options.name;
    return workspaceJson;
  });
}

function updateNxJson(options: Schema): Rule {
  return updateJsonInTree(`/nx.json`, json => {
    return {
      ...json,
      projects: {
        ...json.projects,
        [options.name]: { tags: options.parsedTags }
      }
    };
  });
}

function addTest(options: Schema): Rule {
  if (options.unitTestRunner === 'jest') {
    return externalSchematic('@nrwl/jest', 'jest-project', {
      project: options.name,
      supportTsx: true,
      skipSerializers: true,
      setupFile: 'none'
    });
  }
  return noop();
}
const addFiles = (options: NormalizedSchema): Rule => {
  const { projectRoot } = options;
  return mergeWith(
    apply(url(`./files/lib`), [
      template({
        ...options,
        tmpl: '',
        root: projectRoot
      }),
      move(projectRoot)
    ])
  );
};

export default function (schema: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const options = normalizeOptions<Schema>(host, schema);
    const { isNx } = options;
    return chain([
      init({
        skipFormat: true
      }),
      addFiles(options),
      updateLibPackageNpmScope(options),
      updateWorkspaceJson(options),
      isNx ? updateNxJson(options) : noop(),
      addTest(options),
      formatFiles({ skipFormat: false })
    ])(host, context);
  };
}

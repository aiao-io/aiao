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
import {
  formatFiles,
  generateProjectLint,
  getNpmScope,
  Linter,
  readJsonInTree,
  updateJsonInTree,
  updateWorkspaceInTree
} from '@nrwl/workspace';

import { isNxWorkspace } from '../../util/is-nx';
import init from '../init/init';
import { Schema } from './schema';

interface NormalizedSchema extends Schema {
  name: string;
  scope: string;
  isNx: boolean;
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
}

function addFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files/lib`), [
      template({
        ...options,
        tmpl: '',
        root: options.projectRoot
      }),
      move(options.projectRoot)
    ])
  );
}

function updateLibPackageNpmScope(options: NormalizedSchema): Rule {
  const { projectRoot, name, scope } = options;
  return () => {
    return updateJsonInTree(`${projectRoot}/package.json`, json => {
      json.name = options.scope ? `@${scope}/${name}` : name;
      return json;
    });
  };
}

function getBuildConfig(options: NormalizedSchema) {
  return {
    builder: '@aiao/stencil-toolkit:build',
    options: {
      outputPath: join(normalize('dist'), options.projectRoot),
      config: `${options.projectRoot}/stencil.config.ts`
    }
  };
}

function getServeConfig(options: NormalizedSchema) {
  return {
    builder: '@aiao/stencil-toolkit:serve',
    options: {
      config: `${options.projectRoot}/stencil.config.ts`
    }
  };
}

function updateWorkspaceJson(options: NormalizedSchema): Rule {
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

function updateNxJson(options: NormalizedSchema): Rule {
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

function addTest(options: NormalizedSchema): Rule {
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

export default function(schema: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const options = normalizeOptions(host, schema);
    const { isNx } = options;
    return chain([
      init({
        vendors: options.vendors,
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

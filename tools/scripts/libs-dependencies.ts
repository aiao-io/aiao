import { readdirSync, readJsonSync, writeJSONSync } from 'fs-extra';
import { flattenDeep, isNumber, union } from 'lodash';
import Ora from 'ora';
import { join } from 'path';
import { Project } from 'ts-morph';

import { execCmdToPromise } from '../util/exec';

const rootPkg = readJsonSync('package.json');
const namespace = '@aiao';
const ignoreList: string[] = ['child_process', 'fs', 'os', 'glob', 'path'];
const dependenceMap: { [name: string]: string } = {
  '@angular-devkit/architect': '^12.0.0',
  '@angular-devkit/core': '^12.0.0',
  '@angular-devkit/schematics': '^12.0.0'
};
const changes: string[] = [];

function findLibPkgVersion(name: string) {
  if (name.startsWith(namespace)) {
    const libName = name.replace(namespace, '');
    const pkg = readJsonSync(join('libs', libName, 'package.json'));
    if (pkg.version) return `^${pkg.version}`;
  }
  return null;
}

const errorVersion: string[] = [];

function getVersion(d: string) {
  let back = rootPkg.dependencies[d] || dependenceMap[d] || findLibPkgVersion(d) || '*';
  if (back === '*') {
    errorVersion.push(d);
  }
  if (/[0-9]/.test(back.charAt(0))) {
    back = `^${back}`;
  }
  return {
    [d]: back
  };
}

function buildDependecies(name: string) {
  const ora = Ora();
  ora.succeed(name);
  const project = new Project();
  const files = [`libs/${name}/src/lib/**/*.ts`, `libs/${name}/*/src/**/*.ts`, `libs/${name}/adapters/**/*.ts`];

  project.addSourceFilesAtPaths(files);
  const sourceFiles = project.getSourceFiles(files);
  const _all = sourceFiles.map(file => file.getImportDeclarations().map(d => d.getModuleSpecifier().getText()));
  let allImports = flattenDeep(_all)
    .map((d: string) => d.replace(/^'|'$/g, '').replace(/^"|"$/g, ''))
    .filter(
      d =>
        ![
          ...Object.keys(rootPkg.devDependencies),
          'fs',
          'crypto',
          'https',
          'url',
          'util',
          'querystring',
          'path',
          'jest-preset-angular'
        ].includes(d)
    )
    .filter(d => !d.startsWith('.'))
    .filter(d => d.indexOf('/testing') === -1)
    .map(d => {
      const ra = /(^@[^\/]+\/[^\/]+)/;
      const rb = /(^[^(\/|@)]+)/;
      const ea = ra.exec(d);
      const eb = rb.exec(d);
      const ec = ea || eb;
      return ec && ec[0];
    })
    .map(d => (`${d}`.startsWith('rxjs') ? 'rxjs' : d!));

  allImports = union(allImports)
    .filter(n => n !== `${namespace}/${name}`)
    .filter(d => !ignoreList.includes(d))
    .sort()
    .reverse();
  const devDependencies = allImports
    .filter(d => `${d}`.startsWith(namespace))
    .map(getVersion)
    .reduce((p, c) => ({ ...c, ...p }), {});

  const peerDependencies = allImports.map(getVersion).reduce((p, c) => ({ ...c, ...p }), {});

  let pkg: any;
  try {
    pkg = readJsonSync(`libs/${name}/package.json`);
  } catch (error) {
    return;
  }

  pkg.peerDependencies = peerDependencies;
  pkg.devDependencies = devDependencies;

  changes.push(`libs/${name}/package.json`);
  writeJSONSync(`libs/${name}/package.json`, pkg, { spaces: 2 });

  ora.stop();
}

const libs = readdirSync('libs');

libs
  .filter(name => {
    return !name.startsWith('.');
  })
  .forEach(name => buildDependecies(name));
const allErrors = union(errorVersion).sort();
execCmdToPromise('yarn prettier --write ' + changes.join(' ')).then(d => {
  if (allErrors.length > 0) {
    console.error('未识别', allErrors);
  }
});
/**
 * yarn run:tools tools/scripts/libs-dependencies.ts
 */

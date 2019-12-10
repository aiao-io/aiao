import { existsSync, mkdirSync } from 'fs';
import { ensureSymlinkSync, rmdirSync } from 'fs-extra';
import ora from 'ora';

import { run } from '../util/runner';

const aiaoNpmPath = 'node_modules/@aiao';
const libDistPath = 'dist/libs';

const checkSylink = async () => {
  const check = ora('symlink').start();
  if (existsSync(aiaoNpmPath)) {
    rmdirSync(aiaoNpmPath, { recursive: true });
  }
  if (!existsSync(libDistPath)) {
    mkdirSync(libDistPath);
  }
  ensureSymlinkSync(libDistPath, aiaoNpmPath);
  check.succeed();
  return;
};

const checkLibBuild = async () => {
  const check = ora('build').start();
  const libs = ['util', 'image-storage', 'elements-cdk', 'stencil-toolkit', 'elements'];
  const needBuildLibs = [];
  libs.forEach(name => {
    if (!existsSync(`dist/libs/${name}`)) {
      needBuildLibs.push(`--scope @aiao/${name}`);
    }
  });
  if (needBuildLibs.length > 0) {
    await run('node_modules/.bin/lerna', ['run', 'build', ...needBuildLibs]);
  }
  check.succeed();
  return;
};

const checkWorkspace = async () => {
  await checkSylink();
  await checkLibBuild();
};

checkWorkspace().then();

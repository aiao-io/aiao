import { existsSync } from 'fs';
import ora from 'ora';

import { run } from '../util/runner';

export const checkLibBuild = async () => {
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

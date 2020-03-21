import { existsSync } from 'fs';
import ora from 'ora';

import { run } from '../util/runner';

const NEED_CHECK_LIBS = ['stencil-toolkit', 'elements'];

/**
 * 检查顶层基础 lib 是否已经构建
 */
export const checkLibBuild = async () => {
  const check = ora('build').start();
  const needBuildLibs = [];
  NEED_CHECK_LIBS.forEach(name => {
    if (!existsSync(`dist/libs/${name}`)) {
      needBuildLibs.push(`--scope @aiao/${name}`);
    }
  });
  if (needBuildLibs.length > 0) {
    await run('node_modules/.bin/lerna', ['run', 'build', ...needBuildLibs, '--concurrency=1']);
  }
  check.succeed();
  return;
};

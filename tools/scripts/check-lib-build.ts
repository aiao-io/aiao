import ora from 'ora';

import { run } from '../util/runner';
import { NEED_CHECK_LIBS } from '../workspace';

/**
 * 检查基础 lib 是否已经构建
 */
export const checkLibBuild = async () => {
  const check = ora('build').start();
  for (let index = 0; index < NEED_CHECK_LIBS.length; index++) {
    await run('yarn', ['nx build', NEED_CHECK_LIBS[index]]);
  }
  check.succeed();
  return;
};

import ora from 'ora';

import { run } from '../util/runner';
import { NEED_CHECK_LIBS } from '../workspace';

/**
 * 检查基础 lib 是否已经构建
 */
export const checkLibBuild = async () => {
  const check = ora('build').start();
  if (NEED_CHECK_LIBS.length) {
    await run('yarn', [`nx run-many --with-deps --target=build --projects=${NEED_CHECK_LIBS.join(',')}`]);
  }
  check.succeed();
  return;
};

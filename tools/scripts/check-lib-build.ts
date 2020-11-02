import { existsSync } from 'fs';
import ora from 'ora';
import { resolve } from 'path';

import { getAffectedLibs } from '../util/get-affected-libs';
import { run } from '../util/runner';
import { NEED_CHECK_LIBS, NPM_SCOPE } from '../workspace';

/**
 * 检查基础 lib 是否已经构建
 */
export const checkLibBuild = async () => {
  const check = ora('build').start();
  const needBuildLibs: string[] = [];
  const affectedLibs = getAffectedLibs();
  NEED_CHECK_LIBS.forEach(name => {
    // 文件不存在, 或是已经变化都重新构建
    if (!existsSync(`dist/libs/${name}`) || affectedLibs.includes(name)) {
      needBuildLibs.push(`--scope @${NPM_SCOPE}/${name}`);
    }
  });
  if (needBuildLibs.length > 0) {
    await run(resolve('node_modules/.bin/lerna'), ['run', 'build', ...needBuildLibs, '--concurrency=1']);
  }
  check.succeed();
  return;
};

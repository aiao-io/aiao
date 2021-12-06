import { existsSync, mkdirSync } from 'fs';
import { ensureSymlinkSync, rmdirSync } from 'fs-extra';
import ora from 'ora';

import { NPM_SCOPE } from '../workspace';

const NPM_SCOPE_PATH = `node_modules/@${NPM_SCOPE}`;
const LIB_DIST_PATH = 'dist/libs';

/**
 * 检查库的符号链接是否建立
 */
export const checkSylink = async () => {
  const check = ora('symlink').start();
  if (existsSync(NPM_SCOPE_PATH)) {
    rmdirSync(NPM_SCOPE_PATH, { recursive: true });
  }
  if (!existsSync(LIB_DIST_PATH)) {
    mkdirSync(LIB_DIST_PATH);
  }
  ensureSymlinkSync(LIB_DIST_PATH, NPM_SCOPE_PATH);
  check.succeed();
  return;
};

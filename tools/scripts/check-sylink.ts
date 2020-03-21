import { existsSync, mkdirSync } from 'fs';
import { ensureSymlinkSync, rmdirSync } from 'fs-extra';
import ora from 'ora';

const aiaoNpmPath = 'node_modules/@aiao';
const libDistPath = 'dist/libs';

/**
 * 检查库的符号链接是否建立
 */
export const checkSylink = async () => {
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

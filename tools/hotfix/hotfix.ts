import chalk from 'chalk';
import { readFileSync, writeFileSync } from 'fs';
import { removeSync } from 'fs-extra';
import globby from 'globby';
import Ora from 'ora';
import { join } from 'path';
import { cwd, exit } from 'process';

import { getFileMD5 } from '../util/md5';

const ora = Ora();
console.log(chalk.bgGreen.black('热修复'));

/**
 * 热修复 node_modules 文件
 * 有时候依赖性库有错误，或是新版未发布，或是单纯想改变功能，可以用热修复直接替换 node_modules 相应文件
 * @param path 路径
 * @param md5 原始 md5
 * @param fixStr 修复后的文件 string
 * @param fixMd5 修复后的 md5
 */
function fixFile(path: string, md5: string, fixStr: string, fixMd5: string) {
  const msg = chalk.green(path);
  ora.start(msg);
  const fileMd5 = getFileMD5(path);
  if (fileMd5 !== fixMd5) {
    if (fileMd5 === md5) {
      writeFileSync(path, fixStr);
      ora.succeed(msg + chalk.blue(' [更改]'));
    } else {
      ora.fail(chalk.red(path) + ' ' + chalk.red(fileMd5));
    }
  } else {
    ora.succeed(msg);
  }
}

const fixFileRoot = join(cwd(), 'tools/hotfix/node_modules_files/');
interface IFixFile {
  md5: string;
  path: string;
  fixStr: string;
  fixMd5: string;
}
async function fixFiles() {
  const globbyFiles = await globby(join(fixFileRoot, '**/*.*'));
  const files: IFixFile[] = [];
  globbyFiles.forEach(d => {
    let p = d.lastIndexOf('.');
    let md5 = d.slice(p + 1);
    let needUpdateFile = false;

    if (md5.length < 10) {
      needUpdateFile = true;
      p = d.length;
    }

    const fixPath: string = d.slice(0, p);
    const fixStr = readFileSync(d, { encoding: 'utf8' });
    const fixMd5 = getFileMD5(d);
    const path = join(cwd(), 'node_modules', fixPath.replace(fixFileRoot, ''));
    if (needUpdateFile) {
      try {
        md5 = getFileMD5(path);
        writeFileSync(`${d}.${md5}`, fixStr);
        removeSync(d);
        files.push({
          md5,
          path,
          fixStr,
          fixMd5
        });
      } catch (error) {
        ora.fail(chalk.red(path + ' [路径不存在]'));
      }
    }
    files.push({
      md5,
      path,
      fixStr,
      fixMd5
    });
  });

  files.forEach(d => {
    const { md5, path, fixStr, fixMd5 } = d;
    fixFile(path, md5, fixStr, fixMd5);
  });
  exit();
}

fixFiles();

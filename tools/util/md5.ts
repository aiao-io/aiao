import { createHash } from 'crypto';
import { readFileSync } from 'fs';

/**
 * 获取文件 md5
 * @param path 文件
 */
export const getFileMD5 = (path: string | Buffer) => {
  let file: Buffer;
  if (Buffer.isBuffer(path)) {
    file = path;
  } else {
    file = readFileSync(path);
  }
  return createHash('md5').update(file).digest('hex');
};

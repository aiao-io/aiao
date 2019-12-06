import { existsSync, mkdirSync } from 'fs';
import { ensureSymlinkSync, rmdirSync } from 'fs-extra';

console.log('ensureSymlink aiao');
rmdirSync('node_modules/@aiao', { recursive: true });

if (!existsSync('dist/libs')) {
  mkdirSync('dist/libs');
}
ensureSymlinkSync('dist/libs', 'node_modules/@aiao');

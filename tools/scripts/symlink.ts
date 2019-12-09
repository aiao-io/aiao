import { existsSync, mkdirSync } from 'fs';
import { ensureSymlinkSync, rmdirSync } from 'fs-extra';

console.log('ensureSymlink aiao');

const aiaoNpmPath = 'node_modules/@aiao';
const libDistPath = 'dist/libs';

if (existsSync(aiaoNpmPath)) {
  rmdirSync(aiaoNpmPath, { recursive: true });
}

if (!existsSync(libDistPath)) {
  mkdirSync(libDistPath);
}

ensureSymlinkSync(libDistPath, aiaoNpmPath);

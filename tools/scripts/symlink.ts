import { ensureSymlinkSync, rmdirSync } from 'fs-extra';

console.log('ensureSymlink aiao');
rmdirSync('node_modules/@aiao', { recursive: true });
ensureSymlinkSync('dist/libs', 'node_modules/@aiao');

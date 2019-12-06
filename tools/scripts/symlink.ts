import { ensureSymlinkSync, rmdirSync } from 'fs-extra';
console.log('ensureSymlink aiao');
try {
  rmdirSync('node_modules/@aiao', { recursive: true });
} catch {}
ensureSymlinkSync('dist/libs', 'node_modules/@aiao');

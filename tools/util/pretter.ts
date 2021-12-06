import { execSync } from 'child_process';
import path from 'path';
import resolve from 'resolve';

export function prettierSync(patterns: string[]) {
  if (patterns.length > 0) {
    execSync(`node "${prettierPath()}" --write ${patterns.join(' ')}`, {
      stdio: [0, 1, 2]
    });
  }
}

function prettierPath() {
  const basePath = path.dirname(resolve.sync('prettier', { basedir: __dirname }));
  return path.join(basePath, 'bin-prettier.js');
}

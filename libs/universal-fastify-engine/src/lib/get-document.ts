import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const templateCacheMap = new Map<string, string>();

export function getDocument(path: string): string | undefined {
  if (templateCacheMap.has(path)) {
    return templateCacheMap.get(path);
  }
  const indexOriginal = join(path, 'index.original.html');
  const index = join(path, 'index.html');

  let file!: string;
  if (existsSync(indexOriginal)) {
    file = readFileSync(indexOriginal).toString();
  } else if (existsSync(index)) {
    file = readFileSync(index).toString();
  }
  if (file) {
    templateCacheMap.set(path, file);
    return file;
  }
  return undefined;
}

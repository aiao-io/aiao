import shell from 'shelljs';

const needBase = (base: string): string => {
  if (!base) {
    base = shell.exec('git rev-list --max-parents=0 HEAD');
  }
  return base!;
};

const clean = (info: string) => {
  return info
    .split('\n')
    .map(d => d.trim())
    .filter(d => !!d && d.startsWith('-'))
    .map(d => d.replace('- ', ''));
};

export const affectedApps = (base: string = '') => {
  const info = shell.exec(`yarn nx affected:apps --base ${needBase(base)}`);
  const apps = clean(info);
  return apps;
};

export const affectedLibs = (base: string = '') => {
  base = needBase(base);
  const info = shell.exec(`yarn nx affected:libs --base ${needBase(base)}`);
  const libs = clean(info);
  return libs;
};

export const affectProjects = (base: string) => [...affectedApps(base), ...affectedLibs(base)];

/**
 * yarn run:tools tools/util/affetced.utils.ts
 */

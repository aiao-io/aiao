import shell from 'shelljs';

const needBase = (base: string): string => {
  if (!base) {
    base = shell.exec('git rev-list --max-parents=0 HEAD');
  }
  return base!;
};

export const affectedApps = (base: string = '') => {
  const info = shell.exec(`yarn nx affected:apps --base ${needBase(base)}`);
  const apps = info
    .split('\n')
    .map(d => d.trim())
    .filter(d => !!d && d.startsWith('-'))
    .map(d => d.replace('- ', ''));
  return apps;
};

export const affectedLibs = (base: string = '') => {
  base = needBase(base);
  const info = shell.exec(`yarn nx affected:libs --base ${needBase(base)}`);
  const libs = info
    .split('\n')
    .map(d => d.trim())
    .filter(d => !!d && d.startsWith('-'))
    .map(d => d.replace('- ', ''));
  return libs;
};

export const affectProjects = (base: string) => [...affectedApps(base), ...affectedLibs(base)];

/**
 * yarn run:tools tools/util/affetced.utils.ts
 */

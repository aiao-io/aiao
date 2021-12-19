import shell from 'shelljs';

export const affectedApps = (base: string) => {
  const info = shell.exec(`yarn nx affected:apps --base ${base}`);
  const apps = info
    .split('\n')
    .map(d => d.trim())
    .filter(d => !!d && d.startsWith('-'))
    .map(d => d.replace('- ', ''));
  return apps;
};

export const affectedLibs = (base: string) => {
  const info = shell.exec(`yarn nx affected:libs --base ${base}`);
  const libs = info
    .split('\n')
    .map(d => d.trim())
    .filter(d => !!d && d.startsWith('-'))
    .map(d => d.replace('- ', ''));
  return libs;
};

export const affectProjects = (base: string) => [...affectedApps(base), ...affectedLibs(base)];

/**
 * yarn run:tools tools/util/affetced-apps.ts
 */

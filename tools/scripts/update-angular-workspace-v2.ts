import { readJsonSync, writeJsonSync } from 'fs-extra';
import { join } from 'path';

const angularJson = readJsonSync('angular.json');

const nxJson = readJsonSync('nx.json');

Object.keys(angularJson.projects).forEach(name => {
  const config = angularJson.projects[name];
  const nxConfig = nxJson.projects[name];
  writeJsonSync(join(config.root, 'project.json'), { ...config, ...nxConfig });
});

angularJson.version = 2;
angularJson.projects = Object.keys(angularJson.projects)
  .sort()
  .map(name => ({ [name]: angularJson.projects[name].root }))
  .reduce((c, p) => ({ ...c, ...p }));

delete nxJson.projects;

writeJsonSync('angular.json', angularJson);
writeJsonSync('nx.json', nxJson);

/**
 * yarn run:tools tools/scripts/update-angular-workspace-v2.ts
 */

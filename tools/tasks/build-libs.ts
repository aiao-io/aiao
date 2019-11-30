import chalk from 'chalk';
import { readJSONSync } from 'fs-extra';
import { join } from 'path';
import { cwd } from 'process';

import { run } from '../util/runner';

const pkg = readJSONSync(join(cwd(), './package.json'));
const project = pkg.name.replace('@aiao/', '');
const root = join(cwd(), '../../');
const projectName = `[${project}]`;

console.log(chalk.blue(projectName));
run(join(root, `node_modules/.bin/ng`), [`build ${project}`]).then(
  () => {
    console.log(chalk.blue(projectName, 'ok'));
  },
  err => {
    console.log(chalk.red(projectName, err));
  }
);

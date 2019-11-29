import chalk from 'chalk';
import { readJSONSync } from 'fs-extra';
import { join } from 'path';
import { cwd } from 'process';
import { run } from '../util/runner';

const pkg = readJSONSync(join(cwd(), './package.json'));
const project = pkg.name.replace('@aiao/', '');
const root = join(cwd(), '../../');
// const debugFile = join(root, 'lib-build-debug.log');
const projectName = `[${project}]`;

console.log(chalk.blue(projectName));
// appendFileSync(debugFile, `${projectName} \r\n`, { encoding: 'utf8' });
run(join(root, `node_modules/.bin/ng`), [`build ${project}`]).then(
  () => {
    console.log(chalk.blue(projectName, 'ok'));
    // appendFileSync(debugFile, `${projectName} ok \r\n`, { encoding: 'utf8' });
    // const distPath = join(root, `dist/libs/${project}`);
    // const npmPath = join(root, `node_modules/@aiao/${project}`);
    // try {
    //   removeSync(npmPath);
    // } catch (error) {}
    // copySync(distPath, npmPath);
    // try {
    //   removeSync(distPath);
    // } catch (error) {}
  },
  err => {
    console.log(chalk.red(projectName, 'err'));
    // appendFileSync(debugFile, `${projectName} err \r\n`, { encoding: 'utf8' });
  }
);

import { existsSync } from 'fs';
import { escape, lowerCase, words } from 'lodash';
import { join } from 'path';
import { cwd } from 'process';
import * as shell from 'shelljs';
import * as yargs from 'yargs';

const argv = yargs
  .option('gitPath', { type: 'string', default: join(cwd(), 'deploy-apps') })
  .option('projectName', { type: 'string', default: '' })
  .option('branchName', { type: 'string', default: '' })
  .option('pipelineNumber', { type: 'string', default: '' })
  .option('copyPath', { type: 'string', default: join(cwd(), 'apps/soundcloud/docker') }).argv;

const apps: string[] = shell
  .exec('heroku apps')
  .stdout.split('\n')
  .filter(d => !!d && !d.startsWith('=='));

let nameMaxLength = 30;
nameMaxLength -= argv.projectName.length;
let newBranchName = argv.branchName;
nameMaxLength -= newBranchName.length;
let pipelineNumber = `${argv.pipelineNumber}`;
if (pipelineNumber === '0' || !pipelineNumber) {
  pipelineNumber = '';
}

nameMaxLength -= pipelineNumber.length;
newBranchName = newBranchName.slice(0, nameMaxLength);

const appNameStr = `${argv.projectName}-${newBranchName}-${pipelineNumber}`
  .replace(/-+/, '-')
  .replace(/^-/, '')
  .replace(/-$/, '');

const appName = words(appNameStr).map(escape).map(lowerCase).join('-');

if (!apps.includes(appName)) {
  shell.exec(`heroku create ${appName} --buildpack heroku/nodejs`);
}
const cloneFilder = join(argv.gitPath, appName);
shell.exec(`heroku git:clone --app ${appName} ${cloneFilder}`);

if (!existsSync(cloneFilder)) {
  throw new Error(`${cloneFilder} not found`);
}

shell.ls('-A', cloneFilder).forEach(d => {
  if (d !== '.git') {
    shell.rm('-rf', join(cloneFilder, d));
  }
});

shell.cp('-R', 'dist/apps/soundcloud/*', cloneFilder);
shell.cp('-R', 'apps/soundcloud/docker/*', cloneFilder);
shell.cd(cloneFilder);
shell.exec('git add *');
shell.exec('git commit -m "update"');
shell.exec('git push -f');

import { exit } from 'process';
import yargs from 'yargs';

import { checkLibBuild } from './check-lib-build';
import { checkSylink } from './check-sylink';

const config = yargs.option('lib', { type: 'boolean' }).argv;

const checkWorkspace = async () => {
  await checkSylink();
  if (config.lib) {
    await checkLibBuild();
  }
};

checkWorkspace().then(() => exit());

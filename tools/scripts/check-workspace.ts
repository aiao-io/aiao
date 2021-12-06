import { exit } from 'process';
import yargs from 'yargs';

import { checkLibBuild } from './check-lib-build';
import { checkSylink } from './check-sylink';

const config = yargs.option('lib', { type: 'boolean' }).argv;

/**
 * 检查工作空间
 */
const checkWorkspace = async () => {
  await checkSylink();
  if (config.lib) {
    try {
      await checkLibBuild();
    } catch (error) {
      console.error(error);
      exit(1);
    }
  }
};

checkWorkspace().then(() => exit());

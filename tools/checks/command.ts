import yargs from 'yargs';

import { checkLodash } from './check-lodash';
import { CommandBaseConfig } from './interface';

export default yargs
  .scriptName('check')
  .option('base', {
    type: 'string'
  })
  .option('head', {
    type: 'string'
  })
  .option('all', {
    type: 'boolean'
  })
  .command({
    command: 'lodash',
    handler: async (args: CommandBaseConfig) => {
      await checkLodash(args);
      process.exit();
    }
  })
  .help().argv;

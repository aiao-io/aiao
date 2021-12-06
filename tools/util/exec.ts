import chalk from 'chalk';
import shell from 'shelljs';

export function execCmdToPromise(command: string) {
  const cmd = command.replace(/[\r\n]/g, '').replace(/\ +/g, ' ');

  console.log(chalk.blue(`[cmd]`, cmd));

  return new Promise((resove, reject) => {
    shell.exec(cmd, (code, stdout, stderr) => {
      if (code === 0) {
        resove(true);
      } else {
        reject();
      }
    });
  });
}

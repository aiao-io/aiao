import chalk from 'chalk';
import { ChildProcess, exec, spawn, SpawnOptions } from 'child_process';

export function run(command: string, args: string[], collect: boolean = false) {
  const options: SpawnOptions = {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true
  };
  return new Promise<null | string>((resolve, reject) => {
    const child: ChildProcess = spawn(`${command}`, args, options);
    if (collect) {
      child.stdout?.on('data', data => resolve(data.toString().replace(/\r\n|\n/, '')));
    }
    child.on('close', code => {
      if (code === 0) {
        resolve(null);
      } else {
        console.error(chalk.red(`${command} ${args.join(' ')}`));
        reject();
      }
    });
  });
}

export function runCommandAsync(command: string): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      resolve({ stdout, stderr });
    });
  });
}

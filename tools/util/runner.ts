import chalk from 'chalk';
import { ChildProcess, spawn, SpawnOptions } from 'child_process';

/**
 * 运行命令
 * @param command 命令
 * @param args 参数
 * @param collect 格式输出
 */
export function run(command: string, args: string[] = [], collect: boolean = false) {
  const options: SpawnOptions = {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true
  };
  return new Promise<null | string>((resolve, reject) => {
    const child: ChildProcess = spawn(`${command}`, args, options);

    if (collect) {
      child.stdout?.on('data', data => {
        resolve(data.toString().replace(/\r\n|\n/, ''));
      });
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

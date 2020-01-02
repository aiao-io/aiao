#!/usr/bin/env node

import chalk from 'chalk';
import { execSync } from 'child_process';
import { env, exit } from 'process';

const branchName: string = execSync('git symbolic-ref --short -q HEAD').toString();

if (branchName.trim() !== 'master') {
  exit();
}

const all_types = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore'];
const all_spops = [
  'aiao',
  'color',
  'elements',
  'elements-angular',
  'elements-cdk',
  'elements-react',
  'image-storage',
  'lazy-component',
  'lazy-element',
  'lazy-module',
  'stencil-toolkit',
  'typeorm-plus'
];

const message_en = {
  titile: '🐟🐟🐟 Validating git commit message 🐟🐟🐟',
  accepted: 'Commit ACCEPTED 👌',
  errorHeader: '[Error]: Ho no! 😦 Your commit message: \n',
  errorFooter: '\n 👉️ Does not follow the commit message convention specified in the CONTRIBUTING.md file.',
  tips: `
  type(scope): subject \n BLANK LINE \n body
  possible types: ${chalk.green(all_types.join(', '))}
  possible scopes: ${chalk.green(all_spops.join(', '))}

  EXAMPLE: ${chalk.green('feat(elements): add some feature')}
  `
};

const message_zh_cn = {
  titile: '🐟🐟🐟 验证提交消息 🐟🐟🐟',
  accepted: '通过 👌',
  errorHeader: '[Error]: 😦 出错的消息: \n',
  errorFooter: '\n 👉️不遵循提交消息约定，请查看 CONTRIBUTING.md 文件',
  tips: `
  type(scope): subject \n BLANK LINE \n body
  可选 types: ${chalk.green(all_types.join(', '))}
  可选 scopes: ${chalk.green(all_spops.join(', '))}

  例子: ${chalk.green('feat(elements): add some feature')}
  `
};

const message = env.LANG.includes('zh_CN') ? message_zh_cn : message_en;

console.log(chalk.green(message.titile));
const gitMessage = execSync('git log -1 --no-merges')
  .toString()
  .trim();

const matchCommit = /(feat|fix|docs|style|refactor|perf|test|chore)\((aiao|color|elements|elements-angular|elements-cdk|elements-react|image-storage|lazy-component|lazy-element|lazy-module|stencil-toolkit|typeorm-plus)\):/g.test(
  gitMessage
);

const matchRevert = /revert/gi.test(gitMessage);
const matchRelease = /release/gi.test(gitMessage);
const matchWIP = /WIP/gi.test(gitMessage);
const exitCode = +!(matchRelease || matchRevert || matchCommit || matchWIP);

if (exitCode === 0) {
  console.log(message.accepted);
} else {
  console.log(
    message.errorHeader +
      '-------------------------------------------------------------------\n' +
      gitMessage +
      '\n\n-------------------------------------------------------------------' +
      message.errorFooter
  );
  console.log(message.tips);
}
exit(exitCode);

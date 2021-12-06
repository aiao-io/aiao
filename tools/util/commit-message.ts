import chalk from 'chalk';

import { WORKSPACE_SCOPES, WORKSPACE_TYPES } from '../workspace';
import { systemLang } from './get-current-lang';

const message_en = {
  titile: '🐟🐟🐟 Validating git commit message 🐟🐟🐟',
  accepted: 'Commit ACCEPTED 👌',
  errorHeader: '[Error]: Ho no! 😦 Your commit message: \n',
  errorFooter: '\n 👉️ Does not follow the commit message convention specified in the CONTRIBUTING.md file.',
  tips: `
  type(scope): subject \n BLANK LINE \n body
  possible types: ${chalk.green(WORKSPACE_TYPES.join(', '))}
  possible scopes: ${chalk.green(WORKSPACE_SCOPES.join(', '))}

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
  可选 types: ${chalk.green(WORKSPACE_TYPES.join(', '))}
  可选 scopes: ${chalk.green(WORKSPACE_SCOPES.join(', '))}

  例子: ${chalk.green('feat(elements): add some feature')}
  `
};
export const COMMIT_MESSAGES = systemLang.includes('zh_CN') ? message_zh_cn : message_en;

export function logCommitErrorMessage(message: string) {
  const errorMsg =
    COMMIT_MESSAGES.errorHeader +
    '-------------------------------------------------------------------\n' +
    message +
    '\n\n-------------------------------------------------------------------' +
    COMMIT_MESSAGES.errorFooter;

  console.error(chalk.red(errorMsg));
  console.log(COMMIT_MESSAGES.tips);
}

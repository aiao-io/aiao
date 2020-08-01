import { systemLang } from '../util/get-current-lang';
import { WORKSPACE_SCOPES } from '../workspace';

/**
 * 交互式自动生成代码提交消息文本
 * yarn commit
 */
const scopes = WORKSPACE_SCOPES.map(name => ({ name }));

const base = {
  scopes,
  allowCustomScopes: false,
  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: [],
  subjectLimit: 100
};

const en = {
  ...base,
  types: [
    { value: 'feat', name: 'feat:     A new feature' },
    { value: 'fix', name: 'fix:      A bug fix' },
    { value: 'docs', name: 'docs:     Documentation only changes' },
    {
      value: 'style',
      name:
        'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)'
    },
    {
      value: 'refactor',
      name: 'refactor: A code change that neither fixes a bug nor adds a feature'
    },
    {
      value: 'perf',
      name: 'perf:     A code change that improves performance'
    },
    { value: 'test', name: 'test:     Adding missing tests' },
    {
      value: 'chore',
      name:
        'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation'
    },
    { value: 'revert', name: 'revert:   Revert to a commit' },
    { value: 'WIP', name: 'WIP:      Work in progress' }
  ],
  messages: {
    type: "Select the type of change that you're committing:",
    scope: '\nDenote the SCOPE of this change (optional):',
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?'
  }
};

const zh_CN = {
  ...base,
  types: [
    { value: 'feat', name: 'feat:     ✨ 新功能' },
    { value: 'fix', name: 'fix:      🐛 修复错误' },
    { value: 'docs', name: 'docs:     📖 修改文档' },
    { value: 'style', name: 'style:    💎 代码格式样式' },
    {
      value: 'refactor',
      name: 'refactor: 📦 重构了代码，不是添加功能，也不属于修复错误'
    },
    { value: 'perf', name: 'perf:     🚀 改进性能' },
    { value: 'test', name: 'test:     🚨 增加测试' },
    {
      value: 'chore',
      name: 'chore:    🔨 修改了 CI Build 等辅助工具'
    },
    { value: 'WIP', name: 'WIP:      🐷 临时提交，代码还在进行中' }
  ],
  messages: {
    type: '选择您要提交的更改类型：',
    scope: '\n更改的范围：',
    customScope: '提交的范围：',
    subject: '简短的代码描述：\n',
    body: '详细的代码描述，使用 "|" 符号换行：\n',
    breaking: '不兼容的描述：\n',
    footer: '关闭的问题（例如："fix #123", "re #123".）\n',
    confirmCommit: '你确认要这样提交吗？'
  }
};

const config = systemLang.includes('zh_CN') ? zh_CN : en;

module.exports = config;

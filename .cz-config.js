const base = {
  scopes: [
    { name: 'aiao' },
    { name: 'color' },
    { name: 'elements' },
    { name: 'elements-angular' },
    { name: 'elements-cdk' },
    { name: 'elements-react' },
    { name: 'image-storage' },
    { name: 'lazy-component' },
    { name: 'lazy-element' },
    { name: 'lazy-module' },
    { name: 'stencil-toolkit' },
    { name: 'typeorm-plus' }
  ],
  allowCustomScopes: false,
  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',
  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: [],

  // limit subject length
  subjectLimit: 100
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
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
  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: '\nDenote the SCOPE of this change (optional):',
    // used if allowCustomScopes is true
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
  // override the messages, defaults are as follows
  messages: {
    type: '选择您要提交的更改类型：',
    scope: '\n更改的范围：',
    // used if allowCustomScopes is true
    customScope: '提交的范围：',
    subject: '简短的代码描述：\n',
    body: '详细的代码描述，使用 "|" 符号换行：\n',
    breaking: '不兼容的描述：\n',
    footer: '关闭的问题（例如："fix #123", "re #123".）\n',
    confirmCommit: '你确认要这样提交吗？'
  }
};

const config = process.env.LANG.includes('zh_CN') ? zh_CN : en;

module.exports = config;

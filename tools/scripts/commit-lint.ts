#!/usr/bin/env node

import chalk from 'chalk';
import { execSync } from 'child_process';
import { exit } from 'process';

import { isGitlabMergeRequest } from '../gitlab/util';
import { COMMIT_MESSAGES, logCommitErrorMessage } from '../util/commit-message';
import { isCommitMessageAccepte } from '../util/is-commit-message-accepte';
import { NEED_CHECK_COMMIT_BRANCH_NAMES } from '../workspace';

/**
 * git 代码提交格式检查
 */
const branchName: string = execSync('git symbolic-ref --short -q HEAD').toString().trim();

// 是否需要检查
const needCheck = NEED_CHECK_COMMIT_BRANCH_NAMES.includes(branchName) || isGitlabMergeRequest();
if (!needCheck) {
  exit();
}

console.log(chalk.green(COMMIT_MESSAGES.titile));
const gitMessage = execSync('git log -1 --no-merges').toString().trim();

if (isCommitMessageAccepte(gitMessage)) {
  console.log(COMMIT_MESSAGES.accepted);
  exit();
} else {
  logCommitErrorMessage(gitMessage);
  exit(1);
}

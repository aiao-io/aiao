import { env, exit } from 'process';

import { logCommitErrorMessage } from '../util/commit-message';
import { isCommitMessageAccepte } from '../util/is-commit-message-accepte';
import { isGitlabMergeRequest } from './util';

const { CI_MERGE_REQUEST_TITLE } = env;

export function gitlabCheckPRTitle() {
  console.log('check message:', CI_MERGE_REQUEST_TITLE);
  if (isGitlabMergeRequest()) {
    if (CI_MERGE_REQUEST_TITLE) {
      if (isCommitMessageAccepte(CI_MERGE_REQUEST_TITLE)) {
        console.log('gitlab check pr title success');
      } else {
        logCommitErrorMessage(CI_MERGE_REQUEST_TITLE);
        exit(1);
      }
    }
    exit();
  }
}

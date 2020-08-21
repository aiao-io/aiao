import { env, exit } from 'process';

import { logCommitErrorMessage } from '../util/commit-message';
import { isCommitMessageAccepte } from '../util/is-commit-message-accepte';
import { isGitlabMergeRequest } from './util';

const { CI_MERGE_REQUEST_TITLE } = env;

export function gitlabCheckPRTitle() {
  if (isGitlabMergeRequest()) {
    if (CI_MERGE_REQUEST_TITLE) {
      if (isCommitMessageAccepte(CI_MERGE_REQUEST_TITLE)) {
      } else {
        logCommitErrorMessage(CI_MERGE_REQUEST_TITLE);
        exit(1);
      }
    }
    exit();
  }
}

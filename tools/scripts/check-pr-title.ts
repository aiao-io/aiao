import { gitlabCheckPRTitle } from '../gitlab/gitlab-check-pr-title';
import { isGitlab } from '../gitlab/util';

if (isGitlab()) {
  gitlabCheckPRTitle();
}

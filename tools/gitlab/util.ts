import { env } from 'process';

const { CI_MERGE_REQUEST_ID, GITLAB_CI } = env;

export const isGitlabMergeRequest = () => !!CI_MERGE_REQUEST_ID;
export const isGitlab = () => !!GITLAB_CI;

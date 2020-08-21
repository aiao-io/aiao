import { execSync } from 'child_process';
import { compare } from 'compare-versions';
import { readJsonSync, writeFileSync } from 'fs-extra';
import { env, exit } from 'process';

import { gitlabAPI } from './gitlab-api';
import { isGitlabMergeRequest } from './util';

interface MergeRequests {
  target_branch: string;
  source_branch: string;
  sha: string;
}

//
interface WorkspaceBranchStatus {
  [name: string]: {
    lastDeploy: string;
  };
}

interface BrancheRepository {
  commit: {
    id: string;
  };
}
// 是否支持 dotEnv
const isSupportDotEnv = (version: string) => compare(version, '12.9', '>=');

export async function gitLabSetEnv() {
  const { CI_PROJECT_ID, CI_SERVER_VERSION, CI_COMMIT_SHA, CI_BUILD_REF_NAME, MAST_LAST_DEPLOY_SHA } = env;

  if (!CI_BUILD_REF_NAME || !CI_SERVER_VERSION) {
    throw new Error('环境变量不正确');
  }

  let commitSha = '';
  if (isGitlabMergeRequest()) {
    const mergeRequests = await gitlabAPI.get<MergeRequests[]>(`projects/${CI_PROJECT_ID}/merge_requests`);
    const find = mergeRequests.data.find(result => result.sha === CI_COMMIT_SHA);
    if (!find) {
      throw new Error(`未识别 merge_requests`);
    }
    const brancheRepository = await gitlabAPI.get<BrancheRepository>(
      `projects/${CI_PROJECT_ID}/repository/branches/${find.target_branch}`
    );
    commitSha = brancheRepository.data.commit.id;
  } else {
    let branchStatus: WorkspaceBranchStatus = {};
    try {
      branchStatus = readJsonSync('.workspace-branch-status.json', { encoding: 'utf8' });
    } catch {}
    commitSha =
      branchStatus[CI_BUILD_REF_NAME]?.lastDeploy ||
      MAST_LAST_DEPLOY_SHA ||
      execSync('git rev-parse HEAD~1').toString();
  }
  const AFFECTED_ARGS = `--base ${commitSha}`;
  if (isSupportDotEnv(CI_SERVER_VERSION)) {
    writeFileSync('install.env', `AFFECTED_ARGS=${AFFECTED_ARGS}`);
  } else {
    console.log(AFFECTED_ARGS);
  }

  exit();
}

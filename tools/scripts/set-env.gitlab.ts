import axios from 'axios';
import { compare } from 'compare-versions';
import { writeFileSync } from 'fs-extra';
import { env, exit } from 'process';

interface MergeRequests {
  target_branch: string;
  source_branch: string;
  sha: string;
}

interface BrancheRepository {
  commit: {
    id: string;
  };
}

export async function gitLabSetEnv() {
  const {
    CI_PROJECT_ID,
    CI_SERVER_VERSION,
    CI_COMMIT_SHA,
    GITLAB_ACCESS_TOKEN,
    GITLAB_PRIVATE_TOKEN,
    CI_API_V4_URL
  } = env;

  // 检查环境变量
  if (!GITLAB_ACCESS_TOKEN && !GITLAB_PRIVATE_TOKEN) {
    throw new Error(`环境变量中必须有 GITLAB_ACCESS_TOKEN 或 GITLAB_PRIVATE_TOKEN 用来 API 通信`);
  }

  // 是否支持 dotEnv
  const isSupportDotEnv = compare(CI_SERVER_VERSION, '12.9', '>=');

  // 设置请求头
  let headers = {};
  if (GITLAB_ACCESS_TOKEN) {
    headers = {
      Authorization: `Bearer ${GITLAB_ACCESS_TOKEN}`
    };
  } else if (GITLAB_PRIVATE_TOKEN) {
    headers = {
      'Private-Token': `${GITLAB_PRIVATE_TOKEN}`
    };
  }

  const instance = axios.create({
    baseURL: CI_API_V4_URL,
    timeout: 1000,
    headers
  });
  const mergeRequests = await instance.get<MergeRequests[]>(`projects/${CI_PROJECT_ID}/merge_requests`);
  const find = mergeRequests.data.find(result => result.sha === CI_COMMIT_SHA);
  if (!find) {
    throw new Error(`未识别 merge_requests`);
  }
  const brancheRepository = await instance.get<BrancheRepository>(
    `projects/${CI_PROJECT_ID}/repository/branches/${find.target_branch}`
  );

  const AFFECTED_ARGS = `--base ${brancheRepository.data.commit.id}`;
  if (isSupportDotEnv) {
    writeFileSync('install.env', `AFFECTED_ARGS=${AFFECTED_ARGS}`);
  } else {
    console.log(AFFECTED_ARGS);
  }
  exit();
}

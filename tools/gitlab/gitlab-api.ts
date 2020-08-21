import axios from 'axios';
import { env } from 'process';

const { GITLAB_ACCESS_TOKEN, GITLAB_PRIVATE_TOKEN, CI_API_V4_URL } = env;

// 检查环境变量
if (!GITLAB_ACCESS_TOKEN && !GITLAB_PRIVATE_TOKEN) {
  throw new Error(`环境变量中必须有 GITLAB_ACCESS_TOKEN 或 GITLAB_PRIVATE_TOKEN 用来 API 通信`);
}

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

export const gitlabAPI = axios.create({
  baseURL: CI_API_V4_URL,
  timeout: 1000,
  headers
});

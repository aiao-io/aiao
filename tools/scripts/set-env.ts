import { env } from 'process';

import { gitLabSetEnv } from './set-env.gitlab';

const { GITLAB_CI } = env;
if (GITLAB_CI === 'true') {
  gitLabSetEnv();
}

import { ProjectType } from '@nrwl/workspace/src/core/project-graph';

import { affectedProjects } from './get-affected-projects';

/**
 * 获取受影响的 app 项目
 */
export function getAffectedApps() {
  return affectedProjects()
    .filter(p => p.type === ProjectType.app)
    .map(p => p.name);
}

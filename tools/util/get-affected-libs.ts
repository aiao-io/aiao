import { ProjectType } from '@nrwl/workspace/src/core/project-graph';

import { affectedProjects } from './get-affected-projects';

/**
 * 获取受影响的 lib 项目
 */
export function getAffectedLibs() {
  return affectedProjects()
    .filter(p => p.type === ProjectType.lib)
    .map(p => p.name);
}

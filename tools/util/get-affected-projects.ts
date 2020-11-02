import { Arguments, argv } from 'yargs';

import { parseFiles } from '@nrwl/workspace/src/command-line/shared';
import { splitArgsIntoNxArgsAndOverrides } from '@nrwl/workspace/src/command-line/utils';
import { filterAffected } from '@nrwl/workspace/src/core/affected-project-graph';
import { calculateFileChanges, readEnvironment } from '@nrwl/workspace/src/core/file-utils';
import { createProjectGraph, onlyWorkspaceProjects, withDeps } from '@nrwl/workspace/src/core/project-graph';

/**
 * 获取受影响的项目
 */
export function affectedProjects(parsedArgs: Arguments = argv) {
  const { nxArgs } = splitArgsIntoNxArgsAndOverrides(parsedArgs, 'affected');
  const projectGraph = createProjectGraph();
  let affectedGraph = nxArgs.all
    ? projectGraph
    : filterAffected(projectGraph, calculateFileChanges(parseFiles(nxArgs).files, nxArgs));
  if (parsedArgs.withDeps) {
    affectedGraph = onlyWorkspaceProjects(withDeps(projectGraph, Object.values(affectedGraph.nodes)));
  }
  const projects = parsedArgs.all ? projectGraph.nodes : affectedGraph.nodes;
  const env = readEnvironment(nxArgs.target as string, projects);
  return Object.values(projects).filter(n => !parsedArgs.onlyFailed || !env.workspaceResults.getResult(n.name));
}

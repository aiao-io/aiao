import { Tree } from '@angular-devkit/schematics';

/**
 * 是否是 nx 环境
 * @param host
 */
export const isNxWorkspace = (host: Tree) => host.exists('./nx.json');

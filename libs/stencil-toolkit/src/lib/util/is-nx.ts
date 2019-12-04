import { Tree } from '@angular-devkit/schematics';

export function isNxWorkspace(host: Tree) {
  return host.exists('./nx.json');
}

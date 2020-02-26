import { TreeNodeData } from '../tree-node/tree-node.interface';

export interface TreeNodeConfig {
  id: string;
  icon?: any;
  // hasChildren?: boolean; TODO: 添加功能
  childConfigIds?: string[]; // 允许的 child 名, 不填不允许有 children
}
export type TreeNodeChangeEvent = TreeNodeData[];

import { TreeNode } from './tree-node';

export interface TreeNodeData {
  id: string | number;
  parentId?: string | number;
  configId?: string | number;
  name: string;
  sort: number;
  isLeaf?: boolean;
}

export interface TreeDataState extends TreeNodeData {
  children?: TreeNodeData[];
}

export interface TreeNodeEvent {
  ev: MouseEvent;
  node: TreeNode;
  value?: string | number;
}

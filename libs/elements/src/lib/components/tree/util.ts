import { TreeDataState, TreeNodeData } from '../tree-node/tree-node.interface';

export const findTreeNodeElement = (el: Element): Element | undefined => {
  if (el.classList.contains('tree-drag-node') || el.tagName === 'aiao-tree') {
    return el;
  } else if (el.parentElement) {
    return findTreeNodeElement(el.parentElement);
  }
  return undefined;
};

export const getDataFromDataTransfer = (dataTransfer: DataTransfer, key: string) => {
  const data = dataTransfer && dataTransfer.getData(key);
  return data && JSON.parse(data);
};

export const treeNodeDateToTreeState = (value: TreeNodeData[] = []): TreeDataState[] => {
  const cloneData: TreeDataState[] = value.map(d => ({ ...d }));
  cloneData.forEach(d => {
    const { parentId } = d;
    if (parentId) {
      const parent = cloneData.find(da => da.id === parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(d);
      }
    }
  });
  return cloneData.filter(d => !d.parentId);
};

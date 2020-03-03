import { IElementData } from '@aiao/elements-cdk';

import { IElementEditorData } from '../../interfaces/elements-editor.interface';

let elemntEditId = 1;

const getEditData = (data: IElementData, back: IElementEditorData[] = [], _sort: number): IElementEditorData => {
  const _id = '__node_' + elemntEditId++;
  const hasChildren = data.children?.length > 0;
  if (hasChildren) {
    elementDataToEditData(data.children, back, _id);
    data.children = undefined;
  }
  return { ...data, _id, _sort };
};

export const elementDataToEditData = (
  data: IElementData[] = [],
  back: IElementEditorData[] = [],
  _parentId?: string
): IElementEditorData[] => {
  data.forEach((d, index) => {
    const newData = getEditData(d, back, index);
    newData._parentId = _parentId;
    back.push(newData);
  });
  return back;
};

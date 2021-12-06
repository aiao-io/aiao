import { IElementData } from '@aiao/elements-cdk';

import { IElementEditorData } from '../../interfaces/elements-editor.interface';

let elemntEditId = 1;

/**
 * 获取编辑器数据
 * @param data 原始数据
 * @param back 返回数据
 * @param sort 排序
 */
const getEditData = (data: IElementData, back: IElementEditorData[] = [], sort: number): IElementEditorData => {
  const _id = '__node_' + elemntEditId++;
  const hasChildren = data.children && data.children.length > 0;
  if (hasChildren) {
    elementDataToEditData(data.children, back, _id);
    data.children = undefined;
  }
  return { ...data, _id, _sort: sort };
};

/**
 * 普通数据转换成编辑器支持数据
 * @param data 普通数据
 * @param back 编辑器支持数据
 * @param parentId 父级 id
 */
export const elementDataToEditData = (
  data: IElementData[] = [],
  back: IElementEditorData[] = [],
  parentId?: string
): IElementEditorData[] => {
  data.forEach((d, index) => {
    const newData = getEditData(d, back, index);
    newData._parentId = parentId;
    back.push(newData);
  });
  return back;
};

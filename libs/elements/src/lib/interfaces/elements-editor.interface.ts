import { IElementOptions } from '@aiao/elements-cdk';

/**
 * 编辑器里的元素数据
 */
export interface IElementEditorData extends IElementOptions {
  _id: number;
  _parentId?: number;
  _sort: number;
}

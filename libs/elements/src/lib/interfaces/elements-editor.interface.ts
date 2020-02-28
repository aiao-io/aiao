import { IElementOptions } from '@aiao/elements-cdk';

/**
 * 编辑器里的元素数据
 */
export interface IElementEditorData extends IElementOptions {
  tag: string;
  _id: string | number;
  _parentId?: string | number;
  _sort?: number;
}

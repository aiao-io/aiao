import { IElementConfig, IElementData } from '@aiao/elements-cdk';

import { IElementEditorData } from '../../interfaces/elements-editor.interface';
import { elementsViewDefaultOptions } from './default-options';
import { elementsPreviewHtmlData } from './render-edit';
import { elementsFromDataOptions } from './render-form';
import { elementsDataStringify } from './render-view';
import { ElementsEditOptions } from './render.interface';

/**
 *  elements 视图渲染
 */
export const elementsViewRender = (config: IElementConfig[] = [], data: IElementData[] = []): string => {
  const newData = elementsViewDefaultOptions(config, data);
  return elementsDataStringify(newData);
};

/**
 *  elements 预览渲染
 */
export const elementsPreviewRender = (
  config: IElementConfig[] = [],
  data: IElementEditorData[] = [],
  options: ElementsEditOptions
): IElementEditorData[] => {
  const newData = elementsViewDefaultOptions(config, data);
  return elementsPreviewHtmlData(config, newData, options) as any;
};
/**
 *  elements 预览渲染 html 格式
 */
export const elementsPreviewHtmlRender = (
  config: IElementConfig[] = [],
  data: IElementData[] = [],
  options: ElementsEditOptions
) => {
  const newData = elementsViewDefaultOptions(config, data);
  const editData = elementsPreviewHtmlData(config, newData, options);
  return elementsDataStringify(editData);
};

/**
 *  elements form 表单渲染
 */
export const elementsFormRender = (config: IElementConfig[] = [], data: IElementData[] = []): string => {
  const newData = elementsViewDefaultOptions(config, data);
  const formData = elementsFromDataOptions(config, newData);
  return elementsDataStringify(formData);
};

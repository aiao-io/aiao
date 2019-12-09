import { IElementConfig, IElementData } from '@aiao/elements-cdk';

import { elementsViewDefaultOptions } from './default-options';
import { elementsEditDataOptions } from './render-edit';
import { elementsFromDataOptions } from './render-form';
import { elementsDataStringify } from './render-view';
import { ElementsEditOptions } from './render.interface';

export const elementsViewRender = (config: IElementConfig[] = [], data: IElementData[] = []) => {
  const newData = elementsViewDefaultOptions(config, data);
  return elementsDataStringify(newData);
};

export const elementsEditRender = (
  config: IElementConfig[] = [],
  data: IElementData[] = [],
  options: ElementsEditOptions
) => {
  const newData = elementsViewDefaultOptions(config, data);
  const editData = elementsEditDataOptions(config, newData, options);
  return elementsDataStringify(editData);
};

export const elementsFormRender = (config: IElementConfig[] = [], data: IElementData[] = []) => {
  const newData = elementsViewDefaultOptions(config, data);
  const formData = elementsFromDataOptions(config, newData);
  return elementsDataStringify(formData);
};

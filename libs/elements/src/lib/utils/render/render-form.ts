import { IElementConfig, IElementData } from '@aiao/elements-cdk';

import { ELEMENTS_FORM_ITEM } from './render.interface';

const elementFromDataOptions = (configs: IElementConfig[], data: IElementData) => {
  const { tag, class: cls, attributes: attrs } = data;
  const config = configs.find(conf => conf.tag === tag);
  const newCls = { ...cls, [ELEMENTS_FORM_ITEM]: true };
  if (!config) {
    return { ...data, class: newCls };
  }
  const newAttrs = { ...attrs };
  return { ...data, class: newCls, attributes: newAttrs };
};

/**
 * 获取 elements 表单配置
 * @param configs elements 配置
 * @param data elements 数据
 */
export const elementsFromDataOptions = (configs: IElementConfig[], data: IElementData[]) =>
  [...data].map(d => elementFromDataOptions(configs, d));

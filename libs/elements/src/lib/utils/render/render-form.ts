import { IElementConfig, IElementData } from '@aiao/elements-cdk';

import { ELEMENTS_FORM_ITEM } from './render.interface';

const elementFromDataOptions = (configs: IElementConfig[], data: IElementData) => {
  const { tag, class: cls, attributes: attrs } = data;
  const config: IElementConfig = configs.find(conf => conf.tag === tag);
  const newCls = { ...cls, [ELEMENTS_FORM_ITEM]: true };
  if (!config) {
    return { ...data, class: newCls };
  }
  const newAttrs = { ...attrs };
  return { ...data, class: newCls, attributes: newAttrs };
};

export const elementsFromDataOptions = (configs: IElementConfig[], data: IElementData[]) =>
  [...data].map(d => elementFromDataOptions(configs, d));

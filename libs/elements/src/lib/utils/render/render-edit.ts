import { IElementConfig, IElementData } from '@aiao/elements-cdk';

import { ElementsEditOptions, ELEMENTS_EDIT_ITEM } from './render.interface';

const elementEditDataOptions = (configs: IElementConfig[], data: IElementData, options: ElementsEditOptions) => {
  const { tag, class: cls, attributes: attrs } = data;
  const config: IElementConfig = configs.find(conf => conf.tag === tag);
  if (!config) {
    return data;
  }

  const { innerText: allowInnerText, innerHTML: allowInnerHTML, editTag } = config;
  const newCls = { ...cls };
  const newAttrs = { ...attrs };
  const newTag = editTag || tag;

  switch (options.editMode) {
    case 'edit':
      newCls[ELEMENTS_EDIT_ITEM] = true;
      if (allowInnerHTML || allowInnerText) {
        newAttrs.contentEditable = true;
      }
      break;
    default:
      break;
  }

  return { ...data, tag: newTag, class: newCls, attributes: newAttrs };
};

export const elementsEditDataOptions = (
  configs: IElementConfig[],
  data: IElementData[],
  options: ElementsEditOptions
) => [...data].map(d => elementEditDataOptions(configs, d, options));

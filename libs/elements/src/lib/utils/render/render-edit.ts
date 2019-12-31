import { IElementConfig, IElementData } from '@aiao/elements-cdk';

import { ELEMENTS_EDIT_ITEM, ElementsEditOptions } from './render.interface';

const elementEditDataOptions = (configs: IElementConfig[], data: IElementData, options: ElementsEditOptions) => {
  const { tag, class: cls, attributes: attrs, events } = data;
  const config: IElementConfig = configs.find(conf => conf.tag === tag);
  if (!config) {
    return data;
  }

  const { innerText: allowInnerText, innerHTML: allowInnerHTML, editTag } = config;
  const newCls = { ...cls };
  const newAttrs = { ...attrs };
  const newEvents = { ...events };
  const newTag = editTag || tag;

  switch (options.editMode) {
    case 'edit':
      newCls[ELEMENTS_EDIT_ITEM] = true;
      if (allowInnerHTML || allowInnerText) {
        newAttrs.contentEditable = true;
      }
      newEvents.onInput = (e: any) => {
        const value = allowInnerHTML ? e.target.innerHTML : e.target.innerText;
        console.log('input', value);
      };
      break;
    default:
      break;
  }

  return { ...data, tag: newTag, class: newCls, attributes: newAttrs, events: newEvents };
};

export const elementsPreviewHtmlData = (
  configs: IElementConfig[],
  data: IElementData[],
  options: ElementsEditOptions
) => [...data].map(d => elementEditDataOptions(configs, d, options));

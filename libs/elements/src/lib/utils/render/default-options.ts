import get from 'lodash/get';

import { IElementData, IElementOptions, IElementConfig } from '@aiao/elements-cdk';

const getDefaultValue = (optionName: string, defaultOptions: IElementOptions, currentValue?: any) => {
  // 字符串空值是允许的
  if (currentValue === '') {
    return currentValue;
  }
  return currentValue || get(defaultOptions, optionName) || undefined;
};

const getDefaultOptions = (
  optionName: 'class' | 'style' | 'attributes' | 'events' | 'attributeUtils',
  defaultOptions: IElementOptions,
  defaults: any = {}
) => {
  return {
    ...get(defaultOptions, [optionName]),
    ...defaults
  };
};

export const elementsDefaultOption = (configs: IElementConfig[], data: IElementData): IElementData => {
  const { tag, slot: dataSlot, class: cls, style, attributes, children } = data;
  let { innerText, innerHTML } = data;
  const config: IElementConfig = configs.find(conf => conf.tag === tag);
  if (!config) {
    return { ...data, attributes: { ...attributes }, style: { ...style }, class: { ...cls } };
  }
  const { innerText: allowInnerText, innerHTML: allowInnerHTML, defaultOptions, hasChildren } = config;
  // 嵌入内容处理
  if (allowInnerHTML) {
    innerHTML = getDefaultValue('innerHTML', defaultOptions, innerHTML);
    innerText = undefined;
  } else if (allowInnerText) {
    innerText = getDefaultValue('innerText', defaultOptions, innerText);
    innerHTML = undefined;
  }

  let newChildren: IElementData[];
  if (hasChildren && children && children.length > 0) {
    newChildren = elementsViewDefaultOptions(configs, children);
  }

  console.log('tag', tag, 'style', getDefaultOptions('style', defaultOptions, style));
  return {
    ...data,
    attributes: getDefaultOptions('attributes', defaultOptions, attributes),
    style: getDefaultOptions('style', defaultOptions, style),
    class: getDefaultOptions('class', defaultOptions, cls),
    slot: getDefaultValue('slot', defaultOptions, dataSlot),
    children: newChildren,
    innerText,
    innerHTML
  };
};

export const elementsViewDefaultOptions = (configs: IElementConfig[], data: IElementData[]) => {
  return [...data].map(d => elementsDefaultOption(configs, d));
};

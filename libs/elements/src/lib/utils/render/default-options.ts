import { defaults, get } from 'lodash';

import { IElementConfig, IElementData, IElementOptions } from '@aiao/elements-cdk';

/**
 * 获取默认值
 */
const getDefaultValue = (optionName: string, defaultOptions: IElementOptions = {}, currentValue?: any) => {
  // 字符串空值是允许的, input 删除后就是空值
  if (currentValue === '') {
    return currentValue;
  }
  // 当前值优先
  // 没有 defaultOptions, 或是 defaultOptions 为否的情况返回 undefined
  // TODO:测试 undefined 是否合理
  return currentValue || get(defaultOptions, optionName) || undefined;
};

/**
 * 获取默认 object
 */
const getDefaultOptions = (
  optionName: 'class' | 'style' | 'attributes',
  defaultOptions: IElementOptions = {},
  current: any = {}
) => {
  return defaults(current, get(defaultOptions, optionName));
};

/**
 * 处理单个默认配置
 */
const elementsDefaultOption = (configs: IElementConfig[], data: IElementData): IElementData => {
  const { tag, slot: dataSlot, class: cls, style, attributes, children } = data;
  let { innerText, innerHTML } = data;
  const config = configs.find(conf => conf.tag === tag);
  if (!config) {
    return { ...data };
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

  let newChildren: IElementData[] | undefined;
  if (hasChildren && children && children.length > 0) {
    newChildren = elementsViewDefaultOptions(configs, children);
  }

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

/**
 * 处理默认配置
 */
export const elementsViewDefaultOptions = (configs: IElementConfig[], data: IElementData[]) => {
  return [...data].map(d => elementsDefaultOption(configs, d));
};

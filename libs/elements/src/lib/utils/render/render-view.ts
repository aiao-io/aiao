import { kebabCase } from 'lodash';

import { IElementData } from '@aiao/elements-cdk';

/**
 * 转换单个 element 数据为 html 格式
 * @param data 数据
 */
export const elementDataStringify = (data: IElementData) => {
  const { tag, children, innerHTML, innerText, class: cls, attributes, slot, style } = data;
  const childrenHtml: string = children?.length ? elementsDataStringify(children) : '';
  const innerString = childrenHtml || innerText || innerHTML;

  const props: any = {
    slot
  };

  // class
  if (cls) {
    props.class = Object.keys(cls)
      .filter(name => cls[name] === true)
      .join(' ');
  }

  // attributes
  if (attributes) {
    Object.keys(attributes).forEach(name => (props[name] = attributes[name]));
  }

  // style
  if (style) {
    props.style = Object.keys(style)
      .map(name => `${kebabCase(name)}:${style[name]}`)
      .join(';');
  }

  // propStr
  let propStr = Object.keys(props)
    .filter(name => !!props[name])
    .map(name => `${name}="${props[name]}"`)
    .join(' ');
  if (propStr.length > 0) {
    propStr = ' ' + propStr;
  }

  return `<${tag}${propStr}>${innerString || ''}</${tag}>`;
};

/**
 * 转换多个 elements 数据为 html 格式
 * @param dataArray 数据
 */
export const elementsDataStringify = (dataArray: IElementData[]) =>
  dataArray.map(d => elementDataStringify(d)).join('');

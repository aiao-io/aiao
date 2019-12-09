import kebabCase from 'lodash/kebabCase';

import { IElementData } from '@aiao/elements-cdk';

export const elementDataStringify = (data: IElementData) => {
  const { tag, children, innerHTML, innerText, class: cls, attributes, slot, style } = data;
  const innerString = innerText || innerHTML || (children && children.length ? elementsDataStringify(children) : '');

  const props: any = {
    slot
  };

  // class
  props.class = Object.keys(cls)
    .filter(name => cls[name] === true)
    .join(' ');

  // attributes
  if (attributes) {
    Object.keys(attributes).forEach(name => (props[name] = attributes[name]));
  }

  // style
  props.style = Object.keys(style)
    .map(name => `${kebabCase(name)}:${style[name]}`)
    .join(';');

  // propStr
  let propStr = Object.keys(props)
    .filter(name => !!props[name])
    .map(name => `${name}="${props[name]}"`)
    .join(' ');
  if (propStr.length > 0) {
    propStr = ' ' + propStr;
  }

  return `<${tag}${propStr}>${innerString}</${tag}>`;
};

export const elementsDataStringify = (data: IElementData[] = []) => data.map(d => elementDataStringify(d)).join('');

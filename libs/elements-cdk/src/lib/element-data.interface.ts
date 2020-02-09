// 单个元素的数据
export interface IElementOptions {
  slot?: string;
  innerHTML?: string;
  innerText?: string;
  class?: {
    [name: string]: boolean;
  };
  style?: {
    [name: string]: string;
  };
  attributes?: {
    [name: string]: number | string | any;
  };
  events?: {
    [name: string]: any;
  };
}

/**
 * 单个元素的结构数据
 */
export interface IElementData extends IElementOptions {
  tag: string;
  children?: IElementData[];
}

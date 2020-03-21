import { IElementOptions } from './element-data.interface';

// 元素插槽
export interface IElementConfigSlot {
  name: string;
}

// 元素配置
export interface IElementConfig {
  // 元素的标签
  tag: string;

  // 显示名
  name?: string;
  // 图标
  icon?: any;

  // 编辑时标签
  editTag?: string;
  // 查看器的标签
  inspectorTag?: string;
  // 是否有子元素
  hasChildren?: boolean;

  // 是否支持内联 html
  innerHTML?: boolean;
  // 是否支持内联普通问呗
  innerText?: boolean;

  // 是按钮么
  isButton?: boolean;

  // 是输入类型
  isInput?: boolean;

  // 元素的默认配置
  defaultOptions?: IElementOptions;

  // 插槽配置
  slots?: IElementConfigSlot[];

  // 属性验证的 schema 准备支持 ajv
  schema?: object;
}

// 裁剪类型
export type ImageMethodType = 'lfit' | 'mfit' | 'fill' | 'pad' | 'fixed';
// 图片类型
export type ImageFormatType = 'webp' | 'jpg' | 'png' | 'gif' | 'src';

/**
 * 图片仓库配置
 */
export interface IImageStorageConfig {
  defaultAdapter: string;
  defaultOptions?: Partial<IImageOptions>;
  adapters: IImageStorageAdapter[];
}

/**
 * 图片仓库接口
 */
export interface IImageStorage {
  requestOptions(url: string, options: IImageOptions): IImageRequestOptions;
  cache(url: string, request: IImageRequestOptions): void;
}

/**
 * 配置
 */
export interface IImageOptions {
  adapter?: string;
  width: number;
  height: number;
  quality?: number; // 0-1
  pixelStep?: number;
  devicePixelRatio?: number;
  method?: ImageMethodType;
  format?: ImageFormatType;
}

export const IMAGE_OPTIONS_DEFAULT: {
  quality: number;
  pixelStep: number;
  devicePixelRatio: number;
  method: ImageMethodType;
  format: ImageFormatType;
} = {
  quality: 0.9,
  pixelStep: 1,
  devicePixelRatio: 1,
  method: 'lfit',
  format: 'src'
};

/**
 * 请求配置
 */
export interface IImageRequestOptions {
  url: string;
  width: number;
  height: number;
  quality: number; // 0-1
  method: ImageMethodType;
  format: ImageFormatType;
}

/**
 * 适配器接口
 */
export interface IImageStorageAdapter {
  // 适配器名
  name: string;
  // 请求
  requestOptions(url: string, options: IImageOptions): IImageRequestOptions;
}

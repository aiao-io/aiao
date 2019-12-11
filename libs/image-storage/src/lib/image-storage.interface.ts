export type ImageMethodType = 'lfit' | 'mfit' | 'fill' | 'pad' | 'fixed';
export type ImageFormatType = 'webp' | 'jpg' | 'png' | 'gif' | 'src';

export interface IImageStorageConfig {
  defaultAdapter: string;
  defaultOptions?: Partial<IImageOptions>;
  adapters: IImageStorageAdapter[];
}

export interface IImageStorage {
  requestOptions(url: string, options: IImageOptions): IImageRequestOptions;
  cache(url: string, request: IImageRequestOptions): void;
}

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

export interface IImageRequestOptions {
  url: string;
  width: number;
  height: number;
  quality: number; // 0-1
  method: ImageMethodType;
  format: ImageFormatType;
}

export interface IImageStorageAdapter {
  name: string;
  requestOptions(url: string, options: IImageOptions): IImageRequestOptions;
}

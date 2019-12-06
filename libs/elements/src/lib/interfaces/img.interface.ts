import { IPlatformService } from './platform.interface';
import { IDomSanitizer } from './context.interface';

export type ImageMethodType = 'lfit' | 'mfit' | 'fill' | 'pad' | 'fixed';
export type ImageFormatType = 'webp' | 'jpg' | 'png' | 'gif' | 'src';

export interface ImgArea {
  shape: 'rect' | 'poly' | 'circle';
  coordRatios: number[];
  href?: string;
  alt?: string;
  target?: string;
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

export interface IImageStoragePlugin {
  requestOptions(url: string, options: IImageOptions): IImageRequestOptions;
  cache(url: string, request: IImageRequestOptions): void;
}

export interface IMLabContexts {
  domSanitizer?: IDomSanitizer;
  imageStorage?: IImageStoragePlugin;
  platformService?: IPlatformService;
}

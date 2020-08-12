import { IImageOptions, IImageRequestOptions, IImageStorage, IImageStorageConfig } from './image-storage.interface';

/**
 * 适配器模式基类
 */
export abstract class ImageStorageBase implements IImageStorage {
  protected cacheMap = new Map<string, IImageRequestOptions[]>();

  constructor(public config: IImageStorageConfig) {}

  protected adapter(name: string) {
    const adapter = this.config.adapters.find(d => d.name === name);

    if (!adapter) {
      throw new Error(`[ImageStorageBase] Adapter ${name} 不存在`);
    }
    return adapter;
  }

  abstract requestOptions(url: string, options: IImageOptions): IImageRequestOptions;
  abstract cache(url: string, request: IImageRequestOptions): void;
}

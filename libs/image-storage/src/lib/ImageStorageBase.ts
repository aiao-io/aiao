import { IImageOptions, IImageRequestOptions, IImageStorage, IImageStorageConfig } from './image-storage.interface';

export abstract class ImageStorageBase implements IImageStorage {
  protected cacheMap = new Map<string, IImageRequestOptions[]>();

  constructor(public config: IImageStorageConfig) {}

  protected adapter(name: string) {
    return this.config.adapters.find(d => d.name === name);
  }

  abstract requestOptions(url: string, options: IImageOptions): IImageRequestOptions;
  abstract cache(url: string, request: IImageRequestOptions): void;
}

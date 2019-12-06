import { IImageOptions, IImageRequestOptions } from './image-storage.interface';
import { ImageStorageBase } from './ImageStorageBase';

export class ImageStorage extends ImageStorageBase {
  private findBetter(url: string, result: IImageRequestOptions) {
    const imgs = this.cacheMap.get(url);
    const find = imgs
      .filter(
        d =>
          d.method === result.method &&
          d.format === result.format &&
          d.quality === result.quality &&
          d.width >= result.width &&
          d.height >= result.height
      )
      .sort((a, b) => b.width - a.width);
    if (find && find.length > 0) return find[0];
    return undefined;
  }

  cache(url: string, cacheImg: IImageRequestOptions) {
    if (this.cacheMap.has(url)) {
      const hasBetter = this.findBetter(url, cacheImg);
      if (!hasBetter) {
        this.cacheMap.get(url).push(cacheImg);
      }
    } else {
      this.cacheMap.set(url, [cacheImg]);
    }
  }

  requestOptions(url: string, options: IImageOptions, adapter?: string): IImageRequestOptions {
    const result = this.adapter(adapter || this.config.defaultAdapter).requestOptions(url, {
      ...this.config.defaultOptions,
      ...options
    });
    if (this.cacheMap.has(url)) {
      const hasBetter = this.findBetter(url, result);
      if (hasBetter) return hasBetter;
    }
    return result;
  }
}

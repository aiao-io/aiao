import { IImageOptions, IImageRequestOptions } from './image-storage.interface';
import { ImageStorageBase } from './ImageStorageBase';

/**
 * 图片仓库
 */
export class ImageStorage extends ImageStorageBase {
  /**
   * 从结果中找出最好的
   * @param url url
   * @param req 请求数据
   */
  private findBetter(url: string, req: IImageRequestOptions) {
    const imgs = this.cacheMap.get(url) || [];
    // 找出同样配置像素更宽的图片结果
    const find = imgs
      .filter(
        d =>
          d.method === req.method &&
          d.format === req.format &&
          d.quality === req.quality &&
          d.width >= req.width &&
          d.height >= req.height
      )
      .sort((a, b) => b.width - a.width);
    if (find?.length > 0) return find[0];
    return undefined;
  }

  /**
   *
   * @param url url
   * @param req 请求数据
   */
  cache(url: string, req: IImageRequestOptions) {
    if (this.cacheMap.has(url)) {
      const hasBetter = this.findBetter(url, req);
      if (!hasBetter) {
        this.cacheMap.get(url)!.push(req);
      }
    } else {
      this.cacheMap.set(url, [req]);
    }
  }

  /**
   * 请求
   * @param url url
   * @param options 配置
   * @param adapter 适配器名
   */
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

import {
  IImageOptions,
  IImageRequestOptions,
  IImageStorageAdapter,
  IMAGE_OPTIONS_DEFAULT,
  numberStepScreenSize
} from '@aiao/image-storage';

export class ImageStorageAdapterAliyun implements IImageStorageAdapter {
  name = 'aliyun';

  requestOptions(src: string, options: IImageOptions): IImageRequestOptions {
    const actions = ['image'];
    const { devicePixelRatio, pixelStep, method, width, height, quality, format } = {
      ...IMAGE_OPTIONS_DEFAULT,
      ...options
    };

    const w = numberStepScreenSize(width, pixelStep, devicePixelRatio);
    const h = numberStepScreenSize(height, pixelStep, devicePixelRatio);
    actions.push(`resize,m_${method},w_${w},h_${h}`);
    actions.push(`quality,q_${quality * 100}`);
    actions.push(`format,${format}`);
    const url = new URL(src);
    url.searchParams.set('x-oss-process', actions.join('/'));
    return {
      url: url.href,
      width: w,
      height: h,
      quality,
      method,
      format
    };
  }
}

import { IImageOptions, IImageRequestOptions, IImageStorageAdapter } from '@aiao/image-storage';

const numberStepScreenSize = (value: number, step: number = 80, devicePixelRatio: number = 1) =>
  numberStep(value * devicePixelRatio, step);

const numberStep = (value: number, step: number) => Math.ceil(value / step) * step;

export class ImageStorageAdapterAliyun implements IImageStorageAdapter {
  name = 'aliyun';

  requestOptions(src: string, options: IImageOptions): IImageRequestOptions {
    const actions = ['image'];
    const { devicePixelRatio, pixelStep, method, width, height, quality, format } = options;

    const w = numberStepScreenSize(width, pixelStep, devicePixelRatio);
    const h = numberStepScreenSize(height, pixelStep, devicePixelRatio);
    const q = quality || 0.9;
    const f = format || 'src';
    actions.push(`resize,m_${method},w_${w},h_${h}`);
    actions.push(`quality,q_${q * 100}`);
    actions.push(`format,${f}`);
    const url = new URL(src);
    url.searchParams.set('x-oss-process', actions.join('/'));
    return {
      url: url.href,
      width: w,
      height: h,
      quality: q,
      method,
      format
    };
  }
}

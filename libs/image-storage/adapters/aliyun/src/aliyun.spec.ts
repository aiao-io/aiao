import { ImageStorage } from '../../../src';
import { ImageStorageAdapterAliyun } from './';

describe('ImageStorage', () => {
  it('ImageStorageAdapterAliyun', () => {
    const imageStorage = new ImageStorage({
      defaultOptions: {
        format: 'src'
      },
      defaultAdapter: 'aliyun',
      adapters: [new ImageStorageAdapterAliyun()]
    });

    const img = 'http://image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg';
    const newLink = imageStorage.requestOptions(img, {
      width: 400,
      height: 500
    });

    expect(newLink).toEqual({
      url:
        'http://image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg?x-oss-process=image%2Fresize%2Cm_lfit%2Cw_400%2Ch_500%2Fquality%2Cq_90%2Fformat%2Csrc',
      width: 400,
      height: 500,
      quality: 0.9,
      method: 'lfit',
      format: 'src'
    });
  });
});

# image-storage

OSS 云图片大小请求计算，当前只支持 aliyun

```ts
import { ImageStorage } from '@aiao/image-storage';
import { ImageStorageAdapterAliyun } from '@aiao/image-storage/adapters/aliyun';
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
```

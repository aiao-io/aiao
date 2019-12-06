# mlab-img

<!-- Auto Generated Below -->

## Properties

| Property    | Attribute    | Description                                                                                                                                                                                                                                       | Type                                             | Default     |
| ----------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------- |
| `alt`       | `alt`        | alt                                                                                                                                                                                                                                               | `string`                                         | `undefined` |
| `animation` | `animation`  | 自定义动画                                                                                                                                                                                                                                        | `string`                                         | `'fade'`    |
| `height`    | `height`     |                                                                                                                                                                                                                                                   | `string`                                         | `undefined` |
| `map`       | --           | 锚点                                                                                                                                                                                                                                              | `ImgArea[]`                                      | `undefined` |
| `maxHeight` | `max-height` |                                                                                                                                                                                                                                                   | `string`                                         | `undefined` |
| `maxWidth`  | `max-width`  |                                                                                                                                                                                                                                                   | `string`                                         | `undefined` |
| `method`    | `method`     | 图片方法 lfit：等比缩放，限制在设定在指定 w 与 h 的矩形内的最大图片 mfit：等比缩放，延伸出指定 w 与 h 的矩形框外的最小图片 fill：固定宽高，将延伸出指定 w 与 h 的矩形框外的最小图片进行居中裁剪 pad：固定宽高，缩略填充 fixed：固定宽高，强制缩略 | `"fill" \| "fixed" \| "lfit" \| "mfit" \| "pad"` | `'mfit'`    |
| `minHeight` | `min-height` |                                                                                                                                                                                                                                                   | `string`                                         | `undefined` |
| `minWidth`  | `min-width`  |                                                                                                                                                                                                                                                   | `string`                                         | `undefined` |
| `platform`  | `platform`   | 平台                                                                                                                                                                                                                                              | `string`                                         | `undefined` |
| `src`       | `src`        | 图片地址                                                                                                                                                                                                                                          | `string`                                         | `undefined` |
| `width`     | `width`      |                                                                                                                                                                                                                                                   | `string`                                         | `undefined` |

## Events

| Event            | Description | Type                |
| ---------------- | ----------- | ------------------- |
| `aiaoImgDidLoad` | 图片被加载  | `CustomEvent<void>` |
| `ionError`       |             | `CustomEvent<void>` |

## Methods

### `reload() => Promise<void>`

#### Returns

Type: `Promise<void>`

---

_Built with [StencilJS](https://stenciljs.com/)_

# mlab-img

<!-- Auto Generated Below -->

## Properties

| Property    | Attribute    | Description | Type                                             | Default     |
| ----------- | ------------ | ----------- | ------------------------------------------------ | ----------- |
| `alt`       | `alt`        | alt         | `string`                                         | `''`        |
| `animation` | `animation`  | 自定义动画  | `string`                                         | `'fade'`    |
| `autoRatio` | `auto-ratio` | 自动比例    | `boolean`                                        | `true`      |
| `height`    | `height`     | 预计高度    | `number`                                         | `100`       |
| `map`       | --           | 锚点        | `ImgArea[]`                                      | `undefined` |
| `maxHeight` | `max-height` | 最大高度    | `string`                                         | `undefined` |
| `maxWidth`  | `max-width`  | 最大宽度    | `string`                                         | `undefined` |
| `method`    | `method`     | 图片方法    | `"fill" \| "fixed" \| "lfit" \| "mfit" \| "pad"` | `'lfit'`    |
| `minHeight` | `min-height` | 最小高度    | `string`                                         | `undefined` |
| `minWidth`  | `min-width`  | 最小宽度    | `string`                                         | `undefined` |
| `platform`  | `platform`   | 平台        | `string`                                         | `undefined` |
| `src`       | `src`        | 图片地址    | `string`                                         | `undefined` |
| `width`     | `width`      | 预计宽度    | `number`                                         | `100`       |

## Events

| Event            | Description | Type                |
| ---------------- | ----------- | ------------------- |
| `ionError`       |             | `CustomEvent<void>` |
| `mlabImgDidLoad` | 图片被加载  | `CustomEvent<void>` |

## Methods

### `reload() => Promise<void>`

#### Returns

Type: `Promise<void>`

---

_Built with [StencilJS](https://stenciljs.com/)_

# aiao-img

支持图片云

<!-- Auto Generated Below -->

## Properties

| Property    | Attribute   | Description | Type                                             | Default     |
| ----------- | ----------- | ----------- | ------------------------------------------------ | ----------- |
| `alt`       | `alt`       | alt         | `string`                                         | `undefined` |
| `animation` | `animation` | 自定义动画  | `string`                                         | `'fade'`    |
| `map`       | --          | 锚点        | `IImgArea[]`                                     | `undefined` |
| `method`    | `method`    | 图片方法    | `"fill" \| "fixed" \| "lfit" \| "mfit" \| "pad"` | `'mfit'`    |
| `platform`  | `platform`  | 平台        | `string`                                         | `undefined` |
| `src`       | `src`       | 图片地址    | `string`                                         | `undefined` |

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

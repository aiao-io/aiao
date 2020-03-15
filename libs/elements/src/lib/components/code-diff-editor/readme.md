# aiao-code-diff-editor

代码比较编辑器

<!-- Auto Generated Below -->

## Properties

| Property        | Attribute        | Description                  | Type                         | Default     |
| --------------- | ---------------- | ---------------------------- | ---------------------------- | ----------- |
| `baseUrl`       | `base-url`       | 默认路径 monaco 资源路径     | `string`                     | `undefined` |
| `disabled`      | `disabled`       | 禁用                         | `boolean`                    | `undefined` |
| `language`      | `language`       | 语言                         | `string`                     | `undefined` |
| `localizeCode`  | `localize-code`  | 显示语言，默认根据浏览器判断 | `string`                     | `undefined` |
| `name`          | `name`           | form 名                      | `string`                     | `undefined` |
| `options`       | --               | 配置                         | `IEditorConstructionOptions` | `undefined` |
| `originalValue` | `original-value` | 原始值                       | `string`                     | `undefined` |
| `uri`           | --               | monaco uri                   | `Uri`                        | `undefined` |
| `value`         | `value`          | 当前值                       | `any`                        | `undefined` |

## Events

| Event        | Description | Type               |
| ------------ | ----------- | ------------------ |
| `aiaoChange` | 侦听值更改  | `CustomEvent<any>` |

## Methods

### `action(action: CodeEditorAcitons) => Promise<void>`

action

#### Returns

Type: `Promise<void>`

### `format() => Promise<void>`

格式化

#### Returns

Type: `Promise<void>`

---

_Built with [StencilJS](https://stenciljs.com/)_

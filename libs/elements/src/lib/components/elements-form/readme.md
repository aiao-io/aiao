# aiao-elements-form

elements 表单

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `html`   | `html`    | form html   | `string` | `undefined` |
| `value`  | `value`   | 值          | `any`    | `undefined` |

## Events

| Event        | Description  | Type               |
| ------------ | ------------ | ------------------ |
| `aiaoChange` | 侦听值改变   | `CustomEvent<any>` |
| `aiaoInput`  | 侦听输入改变 | `CustomEvent<any>` |

## Methods

### `flattenPathValues() => Promise<any>`

得到 form 的值 (路径模式)

#### Returns

Type: `Promise<any>`

### `getValue(path: string) => Promise<any>`

获取 form 值

#### Returns

Type: `Promise<any>`

### `markAsDirty() => Promise<void>`

数据已更改

#### Returns

Type: `Promise<void>`

### `markAsPristine() => Promise<void>`

当前值变成原始值

#### Returns

Type: `Promise<void>`

### `reset() => Promise<void>`

重置 form 值

#### Returns

Type: `Promise<void>`

### `setValue(path: string, value: any, emit?: boolean) => Promise<void>`

设置 form 的值

#### Returns

Type: `Promise<void>`

### `setValues(values: any, emit?: boolean) => Promise<void>`

设置 form 值

#### Returns

Type: `Promise<void>`

### `values() => Promise<any>`

获取 form 的值

#### Returns

Type: `Promise<any>`

---

_Built with [StencilJS](https://stenciljs.com/)_

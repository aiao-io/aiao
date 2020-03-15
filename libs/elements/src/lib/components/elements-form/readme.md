# aiao-elements-form

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description    | Type     | Default     |
| -------- | --------- | -------------- | -------- | ----------- |
| `html`   | `html`    |                | `string` | `undefined` |
| `schema` | `schema`  | schema         | `any`    | `undefined` |
| `value`  | `value`   | elements value | `any`    | `undefined` |


## Events

| Event        | Description | Type               |
| ------------ | ----------- | ------------------ |
| `aiaoChange` |             | `CustomEvent<any>` |
| `aiaoInput`  |             | `CustomEvent<any>` |


## Methods

### `flattenPathValues() => Promise<any>`

得到 form 的值(路径模式)

#### Returns

Type: `Promise<any>`



### `getValue(path: string) => Promise<any>`

获取 form 值

#### Returns

Type: `Promise<any>`



### `markAsDirty() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `markAsPristine() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `reset() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setValue(path: string, value: any, emit?: boolean) => Promise<void>`

设置 form 的值

#### Returns

Type: `Promise<void>`



### `setValues(values: any, emit?: boolean) => Promise<void>`

设置 form 的值

#### Returns

Type: `Promise<void>`



### `values() => Promise<any>`

获取 form 的值

#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

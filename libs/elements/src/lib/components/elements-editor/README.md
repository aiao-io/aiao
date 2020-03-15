# aiao-elements-editor

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description   | Type                                              | Default     |
| ---------- | ----------- | ------------- | ------------------------------------------------- | ----------- |
| `config`   | --          | elements 配置   | `IElementConfig[]`                                | `undefined` |
| `disabled` | `disabled`  |               | `boolean`                                         | `undefined` |
| `editMode` | `edit-mode` | elements 编辑模式 | `"add" or "edit" or "move" or "resize" or "view"` | `'edit'`    |
| `name`     | `name`      |               | `string`                                          | `undefined` |
| `value`    | --          | elements 数据   | `IElementData[]`                                  | `undefined` |
| `view`     | --          | 视图元素          | `HTMLElement`                                     | `undefined` |


## Dependencies

### Depends on

- [aiao-elements-preview](../elements-preview)

### Graph
```mermaid
graph TD;
  aiao-elements-editor --> aiao-elements-preview
  style aiao-elements-editor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

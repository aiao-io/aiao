# aiao-text-editor-bar

富文本编辑器控制条

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute | Description   | Type                     | Default     |
| ------------- | --------- | ------------- | ------------------------ | ----------- |
| `actionState` | --        | action 的状态 | `TextActionState`        | `undefined` |
| `options`     | --        | 配置          | `TextEditorBarOptions[]` | `undefined` |

## Events

| Event    | Description | Type               |
| -------- | ----------- | ------------------ |
| `action` | 发送 action | `CustomEvent<any>` |

## Dependencies

### Used by

- [aiao-text-editor](../text-editor)

### Graph

```mermaid
graph TD;
  aiao-text-editor --> aiao-text-editor-bar
  style aiao-text-editor-bar fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_

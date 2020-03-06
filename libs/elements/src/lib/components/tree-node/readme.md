# aiao-tree-node

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute    | Description    | Type                               | Default     |
| ------------ | ------------ | -------------- | ---------------------------------- | ----------- |
| `canDrag`    | `can-drag`   | 可拖放         | `boolean`                          | `false`     |
| `checkable`  | `checkable`  | 是否可检查     | `boolean`                          | `false`     |
| `disabled`   | `disabled`   | 是否禁用       | `boolean`                          | `false`     |
| `expanded`   | `expanded`   | 是否展开       | `boolean`                          | `false`     |
| `icon`       | --           | 图标名         | `{ icon?: string; src?: string; }` | `undefined` |
| `isLeaf`     | `is-leaf`    | 是否是叶子节点 | `boolean`                          | `false`     |
| `name`       | `name`       | 标题           | `string`                           | `undefined` |
| `selectable` | `selectable` | 可选模式       | `boolean`                          | `false`     |
| `selected`   | `selected`   |                | `boolean`                          | `false`     |
| `showIcon`   | `show-icon`  | 显示图标       | `boolean`                          | `false`     |
| `showLine`   | `show-line`  | 显示线         | `boolean`                          | `false`     |
| `value`      | `value`      | 唯一值         | `number \| string`                 | `undefined` |

## Events

| Event                   | Description | Type                         |
| ----------------------- | ----------- | ---------------------------- |
| `aiaoTreeNodeClick`     | 节点 click  | `CustomEvent<TreeNodeEvent>` |
| `aiaoTreeNodeDragEnd`   | drag        | `CustomEvent<TreeNodeEvent>` |
| `aiaoTreeNodeDragEnter` | drag        | `CustomEvent<TreeNodeEvent>` |
| `aiaoTreeNodeDragLeave` | drag        | `CustomEvent<TreeNodeEvent>` |
| `aiaoTreeNodeDragOver`  | drag        | `CustomEvent<TreeNodeEvent>` |
| `aiaoTreeNodeDragStart` | drag        | `CustomEvent<TreeNodeEvent>` |
| `aiaoTreeNodeDrop`      | drag        | `CustomEvent<TreeNodeEvent>` |
| `aiaoTreeNodeOut`       |             | `CustomEvent<TreeNodeEvent>` |
| `aiaoTreeNodeOver`      |             | `CustomEvent<TreeNodeEvent>` |

## Dependencies

### Used by

- [aiao-tree](../tree)

### Graph

```mermaid
graph TD;
  aiao-tree --> aiao-tree-node
  style aiao-tree-node fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_

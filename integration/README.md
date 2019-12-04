# 集成测试

本目录包含一些库的集成用例, 每一个目录都是单独的项目.

## 基本用法

```
cd integration/lazy-component
yarn
yarn start
```

| Package              | 简介                                                             |                              |
| -------------------- | ---------------------------------------------------------------- | ---------------------------- |
| `lazy-component`     | 集成 `@aiao/lazy-component`                                      | [详情](./lazy-component)     |
| `lazy-element`       | 集成 `@aiao/lazy-element`                                        | [详情](./lazy-element)       |
| `lazy-module`        | 集成 `@aiao/lazy-module`                                         | [详情](./lazy-module)        |
| `stencil-toolkit-nx` | 在 `nx`环境中创建 `stencil` 组件并应用到 `react`,`angular`等框架 | [详情](./stencil-toolkit-nx) |

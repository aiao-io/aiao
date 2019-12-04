# 集成测试

This directory contains some sample code, Each directory is a self-contained application.

## 基本用法

```console
yarn install
yarn run build:libs
cd integration/lazy-component
yarn install
yarn start
```

| Package              | Description                                       |                                |
| -------------------- | ------------------------------------------------- | ------------------------------ |
| `lazy-component`     | 集成 `@aiao/lazy-component`                         | [Detail](./lazy-component)     |
| `lazy-element`       | 集成 `@aiao/lazy-element`                           | [Detail](./lazy-element)       |
| `lazy-module`        | 集成 `@aiao/lazy-module`                            | [Detail](./lazy-module)        |
| `stencil-toolkit-nx` | 在 `nx`环境中创建 `stencil` 组件并应用到 `react`,`angular`等框架 | [Detail](./stencil-toolkit-nx) |

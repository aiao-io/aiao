# @aiao/universal-fastify-engine

[![npm](https://img.shields.io/npm/v/@aiao/universal-fastify-engine?style=flat-square)](https://www.npmjs.com/@aiao/universal-fastify-engine)

fastify 支持 Angular universal 的 engine 支持多语言环境

## Use Case

SSR

## Install

```console
yarn add @aiao/universal-fastify-engine
```

## Usage

参考 [apps/dev-universal-fastify-engine](/apps/dev-universal-fastify-engine)

## API

### <a name="setup-options"></a> NgSetupOptions

| 属性                 | 类型               | 说明                               |
| ------------------ | ---------------- | -------------------------------- |
| bootstrap          | Function         | Angular 的服务模块（`AppServerModule`） |
| outputPath         | string           | Angular 项目的输出目录                  |
| baseHref?          | string           | baseHref                         |
| document?          | string           | Angular index.html 的字符串          |
| documentFilePath?  | string           | Angular index.html 的路径           |
| providers?         | StaticProvider[] | 默认的 `providers`                  |
| inlineCriticalCss? | boolean          | 默认 `false`                       |

### RenderOptions

| 属性                 | 类型               | 说明                     |
| ------------------ | ---------------- | ---------------------- |
| document?          | string           | 指定渲染 index.html 的字符串   |
| documentFilePath?  | string           | Angular index.html 的路径 |
| providers?         | StaticProvider[] | 指定 `providers`         |
| inlineCriticalCss? | boolean          | 默认 `false`             |

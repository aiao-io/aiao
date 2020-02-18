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

| 属性                | 类型               | 说明                               |
| ----------------- | ---------------- | -------------------------------- |
| bootstrap         | Function         | Angular 的服务模块（`AppServerModule`） |
| distPath          | string           | Angular 项目的输出目录                  |
| defaultLocale?    | string           | Angular 的默认语言 locale             |
| document?         | string           | Angular index.html 的字符串          |
| documentFilePath? | string           | Angular index.html 的路径           |
| locales?          | string[]         | Angular 发布的多语言                   |
| providers?        | StaticProvider[] | 默认的 `providers`                  |

### RenderOptions

| 属性           | 类型               | 说明                                  |
| ------------ | ---------------- | ----------------------------------- |
| locale?      | string           | 指定渲染语言                              |
| document?    | string           | 指定渲染 index.html 的字符串                |
| providers?   | StaticProvider[] | 指定 `providers`                      |
| disableSend? | boolean          | 关闭默认发送方法，可自定义渲染后的 `index.html` 内容返回 |

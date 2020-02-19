# @aiao/nest-angular-universal

[![npm](https://img.shields.io/npm/v/@aiao/nest-angular-universal?style=flat-square)](https://www.npmjs.com/@aiao/nest-angular-universal)

支持 Angular universal 的 nest 模块


## Use Case

SSR

## Install

```console
yarn add @aiao/nest-angular-universal
```

## Usage

参考 [apps/dev-nest-angular-universal](/apps/dev-nest-angular-universal)

## API

### NestUniversalOptions

继承 [NgSetupOptions](/libs/universal-fastify-engine#setup-options) 的所有配置

| 属性             | 类型      | 说明                    |
| -------------- | ------- | --------------------- |
| production     | boolean | 是否是生产环境               |
| disableRender? | boolean | 禁止默认渲染                |
| browserHost?   | string  | 测试环境的 Angular app 的主机 |
| browserPort?   | number  | 测试环境的 Angular app 的端口 |

# @aiao/nest-angular-universal

[![npm][shields-nest-angular-universal]][npm-nest-angular-universal]

支持 Angular universal 的 nest 模块

## 场景

SSR

## 安装

```console
yarn add @aiao/nest-angular-universal
```

## 使用

参考 [apps/dev-nest-angular-universal](/apps/dev-nest-angular-universal)

## API

### NestUniversalOptions

继承 [NgSetupOptions](/libs/universal-fastify-engine#setup-options) 的所有配置

| 属性           | 类型    | 说明                          |
| -------------- | ------- | ----------------------------- |
| production     | boolean | 是否是生产环境                |
| disableRender? | boolean | 禁止默认渲染                  |
| browserHost?   | string  | 测试环境的 Angular app 的主机 |
| browserPort?   | number  | 测试环境的 Angular app 的端口 |

[shields-nest-angular-universal]: https://img.shields.io/npm/v/@aiao/nest-angular-universal?style=flat-square
[npm-nest-angular-universal]: https://www.npmjs.com/@aiao/nest-angular-universal

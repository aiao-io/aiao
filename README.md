[English](./README.en.md)

# AIAO

[![CircleCI](https://circleci.com/gh/aiao-io/aiao/tree/master.svg?style=svg)](https://circleci.com/gh/aiao-io/aiao/tree/master)
[![codecov](https://codecov.io/gh/aiao-io/aiao/branch/master/graph/badge.svg)](https://codecov.io/gh/aiao-io/aiao)
[![Crowdin](https://badges.crowdin.net/aiao-io/localized.svg)](https://crowdin.com/project/aiao-io)
[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faiao-io%2Faiao.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Faiao-io%2Faiao?ref=badge_shield)
[![CodeFactor](https://www.codefactor.io/repository/github/aiao-io/aiao/badge)](https://www.codefactor.io/repository/github/aiao-io/aiao)
[![Maintainability](https://api.codeclimate.com/v1/badges/a4096c9731142de97d99/maintainability)](https://codeclimate.com/github/aiao-io/aiao/maintainability)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/aiao-io/aiao.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/aiao-io/aiao/context:javascript)

用 `monorepo` 风格代码统一管理、发布一些 `npm` 库。

## Libs

版本小于 `1` 的为内测版本，请谨慎使用。

### Elements

| Package                  | 介绍              | 版本                                                     | 尺寸                                                                                |                                 |
| ------------------------ | ----------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------- |
| `@aiao/elements`         | web component     | [![npm][npm-elements]][npm-elements-url]                 | [![bundlephobia][bundlephobia-elements]][bundlephobia-elements-url]                 | [详情](./libs/elements)         |
| `@aiao/elements-angular` | angular 版        | [![npm][npm-elements-angular]][npm-elements-angular-url] | [![bundlephobia][bundlephobia-elements-angular]][bundlephobia-elements-angular-url] | [详情](./libs/elements-angular) |
| `@aiao/elements-react`   | react 版          | [![npm][npm-elements-react]][npm-elements-react-url]     | [![bundlephobia][bundlephobia-elements-react]][bundlephobia-elements-react-url]     | [详情](./libs/elements-react)   |
| `@aiao/elements-cdk`     | component Dev Kit | [![npm][npm-elements-cdk]][npm-elements-cdk-url]         | [![bundlephobia][bundlephobia-elements-cdk]][bundlephobia-elements-cdk-url]         | [详情](./libs/elements-cdk)     |

### Angular

| Package                 | 介绍                                  | 版本                                                   | 尺寸                                                                              |                                |
| ----------------------- | ------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------- | ------------------------------ |
| `@aiao/lazy-module`     | 按需加载 `angular module`             | [![npm][npm-lazy-module]][npm-lazy-module-url]         | [![bundlephobia][bundlephobia-lazy-module]][bundlephobia-lazy-module-url]         | [详情](./libs/lazy-module)     |
| `@aiao/lazy-element`    | 按需加载 `angular element`            | [![npm][npm-lazy-element]][npm-lazy-element-url]       | [![bundlephobia][bundlephobia-lazy-element]][bundlephobia-lazy-element-url]       | [详情](./libs/lazy-element)    |
| `@aiao/lazy-component`  | 按需加载 任意 `module` 的 `component` | [![npm][npm-lazy-component]][npm-lazy-component-url]   | [![bundlephobia][bundlephobia-lazy-component]][bundlephobia-lazy-component-url]   | [详情](./libs/lazy-component)  |
| `@aiao/stencil-toolkit` | `stencil` 工具集 , 支持 `nx`          | [![npm][npm-stencil-toolkit]][npm-stencil-toolkit-url] | [![bundlephobia][bundlephobia-stencil-toolkit]][bundlephobia-stencil-toolkit-url] | [详情](./libs/stencil-toolkit) |

### utils

| Package               | 介绍                           | 版本                                               | 尺寸                                                                          |                              |
| --------------------- | ------------------------------ | -------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------- |
| `@aiao/color`         | 处理颜色                       | [![npm][npm-color]][npm-color-url]                 | [![bundlephobia][bundlephobia-color]][bundlephobia-color-url]                 | [详情](./libs/color)         |
| `@aiao/util`          | 一些小工具                     | [![npm][npm-util]][npm-util-url]                   | [![bundlephobia][bundlephobia-util]][bundlephobia-util-url]                   | [详情](./libs/util)          |
| `@aiao/image-storage` | 线上图片地址生成器             | [![npm][npm-image-storage]][npm-image-storage-url] | [![bundlephobia][bundlephobia-image-storage]][bundlephobia-image-storage-url] | [详情](./libs/image-storage) |
| `@aiao/typeorm-plus`  | 让 typeorm 支持 sequelize 查询 | [![npm][npm-typeorm-plus]][npm-typeorm-plus-url]   | [![bundlephobia][bundlephobia-typeorm-plus]][bundlephobia-typeorm-plus-url]   | [详情](./libs/typeorm-plus)  |

## 项目结构

结构大部分遵循 [Nx](https://github.com/nrwl/nx) 规则。

- `apps` 应用目录
- `integration` 库的集成方案目录
- `libs` 库目录
- `tools` 工具集

## 安装

- `cypress` 下载较慢，请安装前手动下载并配制环境变量 `CYPRESS_INSTALL_BINARY=0` 跳过下载，[更多安装方法](cypress-install-zh-cn)。
- 本项目请使用 `yarn` 作为默认安装方式。并强制 `registry` 配置为默认值。如果你下载过于缓慢，可以删除 `.yarnrc` 和 `.npmrc` 文件来提高安装速度。

```console
yarn
```

## 构建项目

### 构建所有库

```console
yarn build:libs
```

### 单独构建 `util` 库

```console
ng build util
```

## 单元测试

> 部分库需要数据库支持，请自行启动

### 测试所有库

```console
yarn test
```

### 测试 `util` 库

```console
ng test util
```

## 贡献

非常欢迎各位小伙伴一起贡献代码，请先查阅[贡献指南](CONTRIBUTING.md)

## License MIT

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faiao-io%2Faiao.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Faiao-io%2Faiao?ref=badge_large)

<!-- npm -->

[npm-color]: https://img.shields.io/npm/v/@aiao/color?label=&style=flat-square
[npm-elements-angular]: https://img.shields.io/npm/v/@aiao/elements-angular?label=&style=flat-square
[npm-elements-cdk]: https://img.shields.io/npm/v/@aiao/elements-cdk?label=&style=flat-square
[npm-elements-react]: https://img.shields.io/npm/v/@aiao/elements-react?label=&style=flat-square
[npm-elements]: https://img.shields.io/npm/v/@aiao/elements?label=&style=flat-square
[npm-image-storage]: https://img.shields.io/npm/v/@aiao/image-storage?label=&style=flat-square
[npm-lazy-component]: https://img.shields.io/npm/v/@aiao/lazy-component?label=&style=flat-square
[npm-lazy-element]: https://img.shields.io/npm/v/@aiao/lazy-element?label=&style=flat-square
[npm-lazy-module]: https://img.shields.io/npm/v/@aiao/lazy-module?label=&style=flat-square
[npm-stencil-toolkit]: https://img.shields.io/npm/v/@aiao/stencil-toolkit?label=&style=flat-square
[npm-typeorm-plus]: https://img.shields.io/npm/v/@aiao/typeorm-plus?label=&style=flat-square
[npm-util]: https://img.shields.io/npm/v/@aiao/util?label=&style=flat-square

<!-- npm url -->

[npm-color-url]: https://www.npmjs.com/@aiao/color
[npm-elements-angular-url]: https://www.npmjs.com/@aiao/elements-angular
[npm-elements-cdk-url]: https://www.npmjs.com/@aiao/elements-cdk
[npm-elements-react-url]: https://www.npmjs.com/@aiao/elements-react
[npm-elements-url]: https://www.npmjs.com/@aiao/elements
[npm-image-storage-url]: https://www.npmjs.com/@aiao/image-storage
[npm-lazy-component-url]: https://www.npmjs.com/@aiao/lazy-component
[npm-lazy-element-url]: https://www.npmjs.com/@aiao/lazy-element
[npm-lazy-module-url]: https://www.npmjs.com/@aiao/lazy-module
[npm-stencil-toolkit-url]: https://www.npmjs.com/@aiao/stencil-toolkit
[npm-typeorm-plus-url]: https://www.npmjs.com/@aiao/typeorm-plus
[npm-util-url]: https://www.npmjs.com/@aiao/util

<!-- bundlephobia -->

[bundlephobia-color]: https://img.shields.io/bundlephobia/minzip/@aiao/color?label=&style=flat-square
[bundlephobia-elements-angular]: https://img.shields.io/bundlephobia/minzip/@aiao/elements-angular?label=&style=flat-square
[bundlephobia-elements-cdk]: https://img.shields.io/bundlephobia/minzip/@aiao/elements-cdk?label=&style=flat-square
[bundlephobia-elements-react]: https://img.shields.io/bundlephobia/minzip/@aiao/elements-react?label=&style=flat-square
[bundlephobia-elements]: https://img.shields.io/bundlephobia/minzip/@aiao/elements?label=&style=flat-square
[bundlephobia-image-storage]: https://img.shields.io/bundlephobia/minzip/@aiao/image-storage?label=&style=flat-square
[bundlephobia-lazy-component]: https://img.shields.io/bundlephobia/minzip/@aiao/lazy-component?label=&style=flat-square
[bundlephobia-lazy-element]: https://img.shields.io/bundlephobia/minzip/@aiao/lazy-element?label=&style=flat-square
[bundlephobia-lazy-module]: https://img.shields.io/bundlephobia/minzip/@aiao/lazy-module?label=&style=flat-square
[bundlephobia-stencil-toolkit]: https://img.shields.io/bundlephobia/minzip/@aiao/stencil-toolkit?label=&style=flat-square
[bundlephobia-typeorm-plus]: https://img.shields.io/bundlephobia/minzip/@aiao/typeorm-plus?label=&style=flat-square
[bundlephobia-util]: https://img.shields.io/bundlephobia/minzip/@aiao/util?label=&style=flat-square

<!-- bundlephobia url -->

[bundlephobia-color-url]: https://bundlephobia.com/result?p=@aiao/color
[bundlephobia-elements-angular-url]: https://bundlephobia.com/result?p=@aiao/elements-angular
[bundlephobia-elements-cdk-url]: https://bundlephobia.com/result?p=@aiao/elements-cdk
[bundlephobia-elements-react-url]: https://bundlephobia.com/result?p=@aiao/elements-react
[bundlephobia-elements-url]: https://bundlephobia.com/result?p=@aiao/elements
[bundlephobia-image-storage-url]: https://bundlephobia.com/result?p=@aiao/image-storage
[bundlephobia-lazy-component-url]: https://bundlephobia.com/result?p=@aiao/lazy-component
[bundlephobia-lazy-element-url]: https://bundlephobia.com/result?p=@aiao/lazy-element
[bundlephobia-lazy-module-url]: https://bundlephobia.com/result?p=@aiao/lazy-module
[bundlephobia-stencil-toolkit-url]: https://bundlephobia.com/result?p=@aiao/stencil-toolkit
[bundlephobia-typeorm-plus-url]: https://bundlephobia.com/result?p=@aiao/typeorm-plus
[bundlephobia-util-url]: https://bundlephobia.com/result?p=@aiao/util

<!-- cypress -->

[cypress-install-en]: https://docs.cypress.io/guides/getting-started/installing-cypress.html
[cypress-install-zh-cn]: https://docs.cypress.io/zh-cn/guides/getting-started/installing-cypress.html

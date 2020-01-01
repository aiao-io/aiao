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

用 `monorepo` 风格代码统一管理发布一些 `npm` 库.

## Libs

小于 1 的为内测版本，请谨慎使用

### Elements

| Package                  | 介绍              | 版本                                                     |                                 |
| ------------------------ | ----------------- | -------------------------------------------------------- | ------------------------------- |
| `@aiao/elements`         | web component     | [![npm][shields-elements]][npm-elements]                 | [详情](./libs/elements)         |
| `@aiao/elements-angular` | angular 版        | [![npm][shields-elements-angular]][npm-elements-angular] | [详情](./libs/elements-angular) |
| `@aiao/elements-react`   | react 版          | [![npm][shields-elements-react]][npm-elements-react]     | [详情](./libs/elements-react)   |
| `@aiao/elements-cdk`     | component Dev Kit | [![npm][shields-elements-cdk]][npm-elements-cdk]         | [详情](./libs/elements-cdk)     |

### Angular

| Package                 | 介绍                                  | 版本                                                   |                                |
| ----------------------- | ------------------------------------- | ------------------------------------------------------ | ------------------------------ |
| `@aiao/lazy-module`     | 按需加载 `angular module`             | [![npm][shields-lazy-module]][npm-lazy-module]         | [详情](./libs/lazy-module)     |
| `@aiao/lazy-element`    | 按需加载 `angular element`            | [![npm][shields-lazy-element]][npm-lazy-element]       | [详情](./libs/lazy-element)    |
| `@aiao/lazy-component`  | 按需加载 任意 `module` 的 `component` | [![npm][shields-lazy-component]][npm-lazy-component]   | [详情](./libs/lazy-component)  |
| `@aiao/stencil-toolkit` | `stencil` 工具集 , 支持 `nx`          | [![npm][shields-stencil-toolkit]][npm-stencil-toolkit] | [详情](./libs/stencil-toolkit) |

### typeorm

| Package              | 介绍                           | 版本                                             |                             |
| -------------------- | ------------------------------ | ------------------------------------------------ | --------------------------- |
| `@aiao/typeorm-plus` | 让 typeorm 支持 sequelize 查询 | [![npm][shields-typeorm-plus]][npm-typeorm-plus] | [详情](./libs/typeorm-plus) |

### utils

| Package               | 介绍               | 版本                               |                              |
| --------------------- | ------------------ | ---------------------------------- | ---------------------------- |
| `@aiao/color`         | 处理颜色           | [![npm][shields-color]][npm-color] | [详情](./libs/color)         |
| `@aiao/util`          | 一些小工具         | [![npm][shields-util]][npm-util]   | [详情](./libs/util)          |
| `@aiao/image-storage` | 线上图片地址生成器 | [![npm][shields-util]][npm-util]   | [详情](./libs/image-storage) |

## 项目结构

## 安装

## 构建项目

### 单元测试

### 端对端测试

## 贡献

非常欢迎各位小伙伴一起贡献代码，请先查阅[贡献指南](./CONTRIBUTING.md)

## License MIT

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faiao-io%2Faiao.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Faiao-io%2Faiao?ref=badge_large)

[shields-color]: https://img.shields.io/npm/v/@aiao/color?label=&style=flat-square
[shields-util]: https://img.shields.io/npm/v/@aiao/util?label=&style=flat-square
[shields-lazy-module]: https://img.shields.io/npm/v/@aiao/lazy-module?label=&style=flat-square
[shields-lazy-element]: https://img.shields.io/npm/v/@aiao/lazy-element?label=&style=flat-square
[shields-lazy-component]: https://img.shields.io/npm/v/@aiao/lazy-component?label=&style=flat-square
[shields-stencil-toolkit]: https://img.shields.io/npm/v/@aiao/stencil-toolkit?label=&style=flat-square
[shields-elements]: https://img.shields.io/npm/v/@aiao/elements?label=&style=flat-square
[shields-elements-angular]: https://img.shields.io/npm/v/@aiao/elements-angular?label=&style=flat-square
[shields-elements-react]: https://img.shields.io/npm/v/@aiao/elements-react?label=&style=flat-square
[shields-elements-cdk]: https://img.shields.io/npm/v/@aiao/elements-cdk?label=&style=flat-square
[shields-typeorm-plus]: https://img.shields.io/npm/v/@aiao/typeorm-plus?label=&style=flat-square
[npm-color]: https://www.npmjs.com/@aiao/color
[npm-util]: https://www.npmjs.com/@aiao/util
[npm-lazy-module]: https://www.npmjs.com/@aiao/lazy-module
[npm-lazy-element]: https://www.npmjs.com/@aiao/lazy-element
[npm-lazy-component]: https://www.npmjs.com/@aiao/lazy-component
[npm-stencil-toolkit]: https://www.npmjs.com/@aiao/stencil-toolkit
[npm-elements]: https://www.npmjs.com/@aiao/elements
[npm-elements-angular]: https://www.npmjs.com/@aiao/elements-angular
[npm-elements-react]: https://www.npmjs.com/@aiao/elements-react
[npm-elements-cdk]: https://www.npmjs.com/@aiao/elements-cdk
[npm-typeorm-plus]: https://www.npmjs.com/@aiao/typeorm-plus

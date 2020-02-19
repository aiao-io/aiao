[English](./README.en.md)

# AIAO

[![CircleCI](https://circleci.com/gh/aiao-io/aiao/tree/master.svg?style=svg)](https://circleci.com/gh/aiao-io/aiao/tree/master) [![codecov](https://codecov.io/gh/aiao-io/aiao/branch/master/graph/badge.svg)](https://codecov.io/gh/aiao-io/aiao) [![Crowdin](https://badges.crowdin.net/aiao-io/localized.svg)](https://crowdin.com/project/aiao-io) [![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faiao-io%2Faiao.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Faiao-io%2Faiao?ref=badge_shield) [![CodeFactor](https://www.codefactor.io/repository/github/aiao-io/aiao/badge)](https://www.codefactor.io/repository/github/aiao-io/aiao) [![Maintainability](https://api.codeclimate.com/v1/badges/a4096c9731142de97d99/maintainability)](https://codeclimate.com/github/aiao-io/aiao/maintainability) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/aiao-io/aiao.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/aiao-io/aiao/context:javascript)

Use `monorepo` style for management some `npm` package。

## Libs

Versions less than ` 1 ` are internal beta versions, please use with caution

### Elements

| Package                  | Description       | Version                                                                                                                              | Scale                                                                                                                                                                   |                                    |
| ------------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `@aiao/elements`         | web component     | [![npm](https://img.shields.io/npm/v/@aiao/elements?label=&style=flat-square)](https://www.npmjs.com/@aiao/elements)                 | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/elements?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/elements)                 | [Details](./libs/elements)         |
| `@aiao/elements-angular` | angular version   | [![npm](https://img.shields.io/npm/v/@aiao/elements-angular?label=&style=flat-square)](https://www.npmjs.com/@aiao/elements-angular) | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/elements-angular?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/elements-angular) | [Details](./libs/elements-angular) |
| `@aiao/elements-react`   | react version     | [![npm](https://img.shields.io/npm/v/@aiao/elements-react?label=&style=flat-square)](https://www.npmjs.com/@aiao/elements-react)     | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/elements-react?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/elements-react)     | [Details](./libs/elements-react)   |
| `@aiao/elements-cdk`     | component Dev Kit | [![npm](https://img.shields.io/npm/v/@aiao/elements-cdk?label=&style=flat-square)](https://www.npmjs.com/@aiao/elements-cdk)         | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/elements-cdk?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/elements-cdk)         | [Detail](./libs/elements-cdk)      |

### Angular

| Package                          | Description                                   | Version                                                                                                                                              | Scale                                                                                                                                                                                   |                                       |
| -------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `@aiao/lazy-module`              | lazy load `angular module`                    | [![npm](https://img.shields.io/npm/v/@aiao/lazy-module?label=&style=flat-square)](https://www.npmjs.com/@aiao/lazy-module)                           | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/lazy-module?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/lazy-module)                           | [Details](./libs/lazy-module)         |
| `@aiao/lazy-element`             | lazy load `angular element`                   | [![npm](https://img.shields.io/npm/v/@aiao/lazy-element?label=&style=flat-square)](https://www.npmjs.com/@aiao/lazy-element)                         | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/lazy-element?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/lazy-element)                         | [Details](./libs/lazy-element)        |
| `@aiao/lazy-component`           | lazy load any `module`'s `component`          | [![npm](https://img.shields.io/npm/v/@aiao/lazy-component?label=&style=flat-square)](https://www.npmjs.com/@aiao/lazy-component)                     | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/lazy-component?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/lazy-component)                     | [Details](./libs/lazy-component)      |
| `@aiao/stencil-toolkit`          | `stencil` toolkit from angular , support `nx` | [![npm](https://img.shields.io/npm/v/@aiao/stencil-toolkit?label=&style=flat-square)](https://www.npmjs.com/@aiao/stencil-toolkit)                   | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/stencil-toolkit?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/stencil-toolkit)                   | [Details](./libs/stencil-toolkit)     |
| `@aiao/universal-fastify-engine` | universal fastify engine                      | [![npm](https://img.shields.io/npm/v/@aiao/universal-fastify-engine?label=&style=flat-square)](https://www.npmjs.com/@aiao/universal-fastify-engine) | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/universal-fastify-engine?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/universal-fastify-engine) | [详情](./libs/universal-fastify-engine) |

### Nest

| Package                        | Description | Version                                                                                                                                          | Scale                                                                                                                                                                               |                                          |
| ------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `@aiao/nest-angular-universal` | color tool  | [![npm](https://img.shields.io/npm/v/@aiao/nest-angular-universal?label=&style=flat-square)](https://www.npmjs.com/@aiao/nest-angular-universal) | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/nest-angular-universal?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/nest-angular-universal) | [Details](./libs/nest-angular-universal) |

### utils

| Package               | 介绍                        | 版本                                                                                                                             | 尺寸                                                                                                                                                                |                            |
| --------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `@aiao/color`         | 处理颜色                      | [![npm](https://img.shields.io/npm/v/@aiao/color?label=&style=flat-square)](https://www.npmjs.com/@aiao/color)                 | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/color?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/color)                 | [详情](./libs/color)         |
| `@aiao/date`          | 处理日期                      | [![npm](https://img.shields.io/npm/v/@aiao/date?label=&style=flat-square)](https://www.npmjs.com/@aiao/date)                   | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/date?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/date)                   | [详情](./libs/date)          |
| `@aiao/image-storage` | 线上图片地址生成器                 | [![npm](https://img.shields.io/npm/v/@aiao/image-storage?label=&style=flat-square)](https://www.npmjs.com/@aiao/image-storage) | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/image-storage?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/image-storage) | [详情](./libs/image-storage) |
| `@aiao/random`        | 处理日期                      | [![npm](https://img.shields.io/npm/v/@aiao/random?label=&style=flat-square)](https://www.npmjs.com/@aiao/random)               | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/random?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/random)               | [详情](./libs/random)        |
| `@aiao/typeorm-plus`  | 让 typeorm 支持 sequelize 查询 | [![npm](https://img.shields.io/npm/v/@aiao/typeorm-plus?label=&style=flat-square)](https://www.npmjs.com/@aiao/typeorm-plus)   | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/typeorm-plus?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/typeorm-plus)   | [详情](./libs/typeorm-plus)  |
| `@aiao/url`           | 处理 url                    | [![npm](https://img.shields.io/npm/v/@aiao/url?label=&style=flat-square)](https://www.npmjs.com/@aiao/url)                     | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/url?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/url)                     | [详情](./libs/url)           |
| `@aiao/util`          | 一些小工具                     | [![npm](https://img.shields.io/npm/v/@aiao/util?label=&style=flat-square)](https://www.npmjs.com/@aiao/util)                   | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/util?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/util)                   | [详情](./libs/util)          |

## Project Structure

The structure mostly follows the [ Nx ](https://github.com/nrwl/nx) rule

- `apps` application directory
- `libs` directory of libraries
- `tools` utils

## Install

- ` cypress ` download is slow, please download and configure environment variables manually before installation ` CYPRESS_INSTALL_BINARY = 0 ` skip download, [ more installation methods ](cypress-install-zh-cn)
- Please use ` yarn ` as the default installation method for this project. And force ` registry ` to be configured as the default. If you download too slowly, you can delete the `.yarnrc ` and `.npmrc ` files to speed up the installation.

```console
yarn
```

## Build Project

### 构建所有库

```console
yarn build:libs
```

### 单独构建 `util` 库

```console
ng build util
```

## Unit Tests

> Some libraries require database support, please start by yourself

### 测试所有库

```console
yarn test
```

### 测试 `util` 库

```console
ng test util
```

## Contribute

Welcome all of you to contribute code, please check the [ Contribution Guide ](CONTRIBUTING.md)

## License MIT

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faiao-io%2Faiao.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Faiao-io%2Faiao?ref=badge_large)

<!-- npm -->



<!-- npm url -->



<!-- bundlephobia -->



<!-- bundlephobia url -->



<!-- cypress -->


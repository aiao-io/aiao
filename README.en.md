# AIAO

[![CircleCI](https://circleci.com/gh/aiao-io/aiao/tree/master.svg?style=svg)](https://circleci.com/gh/aiao-io/aiao/tree/master) [![codecov](https://codecov.io/gh/aiao-io/aiao/branch/master/graph/badge.svg)](https://codecov.io/gh/aiao-io/aiao) [![Crowdin](https://badges.crowdin.net/aiao-io/localized.svg)](https://crowdin.com/project/aiao-io) [![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faiao-io%2Faiao.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Faiao-io%2Faiao?ref=badge_shield) [![CodeFactor](https://www.codefactor.io/repository/github/aiao-io/aiao/badge)](https://www.codefactor.io/repository/github/aiao-io/aiao) [![Maintainability](https://api.codeclimate.com/v1/badges/a4096c9731142de97d99/maintainability)](https://codeclimate.com/github/aiao-io/aiao/maintainability) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/aiao-io/aiao.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/aiao-io/aiao/context:javascript) [![codebeat badge](https://codebeat.co/badges/7b6231bc-ab0d-4ade-b991-907a94758176)](https://codebeat.co/projects/github-com-jimmysh-aiao-master) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/516bfcbd3ca74c8caa1780d20eb1f567)](https://www.codacy.com/gh/aiao-io/aiao/dashboard?utm_source=github.com&utm_medium=referral&utm_content=aiao-io/aiao&utm_campaign=Badge_Grade) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=aiao-io_aiao&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=aiao-io_aiao)

用 `monorepo` 风格代码统一管理、发布一些 `npm` 库。<!-- \[English\](./README.en.md) -->## Apps

| app                            | Description              |                                                |
| ------------------------------ | ------------------------ | ---------------------------------------------- |
| `dev-elements-angular`         | angular 集成演示             | [Details](./apps/dev-elements-angular)         |
| `dev-elements-react`           | react 集成演示               | [Details](./apps/dev-elements-react)           |
| `dev-elements-vue`             | vue 3.0 集成演示             | [Details](./apps/dev-elements-vue)             |
| `dev-lazy-component`           | lazy-component 集成演示      | [Details](./apps/dev-lazy-component)           |
| `dev-lazy-element`             | lazy-element 集成演示        | [Details](./apps/dev-lazy-element)             |
| `dev-lazy-module`              | lazy-module 集成演示         | [Details](./apps/dev-lazy-module)              |
| `dev-nest-angular-universal`   | nest+angular 服务器渲染演示     | [Details](./apps/dev-nest-angular-universal)   |
| `dev-universal-fastify-engine` | universal fastify 渲染引擎演示 | [Details](./apps/dev-universal-fastify-engine) |

## Libs

版本小于 `1` 的为内测版本，请谨慎使用。

### Elements

| Package                  | Description       | Version                                                                                                                              | Scale                                                                                                                                                                   |                                    |
| ------------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `@aiao/elements`         | web component     | [![npm](https://img.shields.io/npm/v/@aiao/elements?label=&style=flat-square)](https://www.npmjs.com/@aiao/elements)                 | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/elements?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/elements)                 | [Details](./libs/elements)         |
| `@aiao/elements-angular` | angular version   | [![npm](https://img.shields.io/npm/v/@aiao/elements-angular?label=&style=flat-square)](https://www.npmjs.com/@aiao/elements-angular) | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/elements-angular?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/elements-angular) | [Details](./libs/elements-angular) |
| `@aiao/elements-react`   | react version     | [![npm](https://img.shields.io/npm/v/@aiao/elements-react?label=&style=flat-square)](https://www.npmjs.com/@aiao/elements-react)     | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/elements-react?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/elements-react)     | [Details](./libs/elements-react)   |
| `@aiao/elements-cdk`     | component Dev Kit | [![npm](https://img.shields.io/npm/v/@aiao/elements-cdk?label=&style=flat-square)](https://www.npmjs.com/@aiao/elements-cdk)         | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/elements-cdk?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/elements-cdk)         | [Details](./libs/elements-cdk)     |

### Angular

| Package                          | Description                                   | Version                                                                                                                                              | Scale                                                                                                                                                                                   |                                            |
| -------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `@aiao/lazy-module`              | lazy load `angular module`                    | [![npm](https://img.shields.io/npm/v/@aiao/lazy-module?label=&style=flat-square)](https://www.npmjs.com/@aiao/lazy-module)                           | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/lazy-module?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/lazy-module)                           | [Details](./libs/lazy-module)              |
| `@aiao/lazy-element`             | lazy load `angular element`                   | [![npm](https://img.shields.io/npm/v/@aiao/lazy-element?label=&style=flat-square)](https://www.npmjs.com/@aiao/lazy-element)                         | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/lazy-element?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/lazy-element)                         | [Details](./libs/lazy-element)             |
| `@aiao/lazy-component`           | lazy load any `module`'s `component`          | [![npm](https://img.shields.io/npm/v/@aiao/lazy-component?label=&style=flat-square)](https://www.npmjs.com/@aiao/lazy-component)                     | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/lazy-component?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/lazy-component)                     | [Details](./libs/lazy-component)           |
| `@aiao/stencil-toolkit`          | `stencil` toolkit from angular , support `nx` | [![npm](https://img.shields.io/npm/v/@aiao/stencil-toolkit?label=&style=flat-square)](https://www.npmjs.com/@aiao/stencil-toolkit)                   | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/stencil-toolkit?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/stencil-toolkit)                   | [Details](./libs/stencil-toolkit)          |
| `@aiao/universal-fastify-engine` | universal fastify engine                      | [![npm](https://img.shields.io/npm/v/@aiao/universal-fastify-engine?label=&style=flat-square)](https://www.npmjs.com/@aiao/universal-fastify-engine) | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/universal-fastify-engine?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/universal-fastify-engine) | [Details](./libs/universal-fastify-engine) |

### Nest

| Package                        | Description | Version                                                                                                                                          | Scale                                                                                                                                                                               |                                         |
| ------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `@aiao/nest-angular-universal` | nest SSR    | [![npm](https://img.shields.io/npm/v/@aiao/nest-angular-universal?label=&style=flat-square)](https://www.npmjs.com/@aiao/nest-angular-universal) | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/nest-angular-universal?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/nest-angular-universal) | [Detail](./libs/nest-angular-universal) |

### Node

| Package                | Description      | Version                                                                                                                          | Scale                                                                                                                                                               |                                  |
| ---------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `@aiao/leancloud-hash` | leancloud 密码计算工具 | [![npm](https://img.shields.io/npm/v/@aiao/leancloud-hash?label=&style=flat-square)](https://www.npmjs.com/@aiao/leancloud-hash) | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/leancloud-hash?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/leancloud-hash) | [Details](./libs/leancloud-hash) |

### utils

| Package               | Description                                                                         | Version                                                                                                                        | Scale                                                                                                                                                             |                                 |
| --------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `@aiao/color`         | A light, small and simple typescript library for color conversion and manipulation. | [![npm](https://img.shields.io/npm/v/@aiao/color?label=&style=flat-square)](https://www.npmjs.com/@aiao/color)                 | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/color?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/color)                 | [Details](./libs/color)         |
| `@aiao/date`          | Date util                                                                           | [![npm](https://img.shields.io/npm/v/@aiao/date?label=&style=flat-square)](https://www.npmjs.com/@aiao/date)                   | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/date?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/date)                   | [Details](./libs/date)          |
| `@aiao/image-storage` | online image address generator                                                      | [![npm](https://img.shields.io/npm/v/@aiao/image-storage?label=&style=flat-square)](https://www.npmjs.com/@aiao/image-storage) | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/image-storage?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/image-storage) | [Details](./libs/image-storage) |
| `@aiao/random`        | random util                                                                         | [![npm](https://img.shields.io/npm/v/@aiao/random?label=&style=flat-square)](https://www.npmjs.com/@aiao/random)               | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/random?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/random)               | [Details](./libs/random)        |
| `@aiao/typeorm-plus`  | make typeorm support sequelize queries                                              | [![npm](https://img.shields.io/npm/v/@aiao/typeorm-plus?label=&style=flat-square)](https://www.npmjs.com/@aiao/typeorm-plus)   | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/typeorm-plus?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/typeorm-plus)   | [Details](./libs/typeorm-plus)  |
| `@aiao/url`           | Url util                                                                            | [![npm](https://img.shields.io/npm/v/@aiao/url?label=&style=flat-square)](https://www.npmjs.com/@aiao/url)                     | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/url?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/url)                     | [Detail](./libs/url)            |
| `@aiao/util`          | utils                                                                               | [![npm](https://img.shields.io/npm/v/@aiao/util?label=&style=flat-square)](https://www.npmjs.com/@aiao/util)                   | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/util?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/util)                   | [Details](./libs/util)          |

## Project Structure

结构大部分遵循 [Nx](https://github.com/nrwl/nx) 规则。

- `apps` application directory
- `libs` directory of libraries
- `tools` utils

## Install

- `cypress` 下载较慢，请安装前手动下载并配制环境变量 `CYPRESS_INSTALL_BINARY=0` 跳过下载，[更多安装方法](https://docs.cypress.io/zh-cn/guides/getting-started/installing-cypress.html)。
- Please use ` yarn ` as the default installation method for this project. And force ` registry ` to be configured as the default. If you download too slowly, you can delete the `.yarnrc ` and `.npmrc ` files to speed up the installation.

```console
yarn
```

## Service

### 启动 lib 服务

> 部分 lib 有服务

```console
yarn start elements
```

### 启动 app 服务

#### 启动 dev-elements-angular 项目

```console
yarn start dev-elements-angular
```

#### 启动 dev-elements-react 项目

```console
yarn start dev-elements-react
```

## Build Project

> 所有构建都在根目录 `dist` 文件夹中

### Build All Libs

```console
yarn build:libs
```

### Build ` util ` library separately

```console
yarn build util --prod
```

## Unit Tests

> Some libraries require database support, please start by yourself

### Test All Libs

```console
yarn test
```

### Test `util` Lib

```console
yarn test util
```

### E2E 测试所有库

> cypress 如果不能正常启动请尝试更高权限

```console
yarn e2e --prod
```

#### MacOS 带权限启动

```console
sudo yarn e2e --prod
```

### E2E 测试 `dev-elements-react-e2e` 库

```console
yarn e2e dev-elements-react-e2e --prod
```

## 构建 App

### 单独构建 dev-elements-angular

```console
yarn run build dev-elements-angular --prod
```

## Contribute

非常欢迎各位小伙伴一起贡献代码，请先查阅[贡献指南](CONTRIBUTING.md)

## License MIT

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faiao-io%2Faiao.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Faiao-io%2Faiao?ref=badge_large)

<!-- npm -->



<!-- npm url -->



<!-- bundlephobia -->



<!-- bundlephobia url -->



<!-- cypress -->


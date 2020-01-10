[English](./README.en.md)

# AIAO

[![CircleCI](https://circleci.com/gh/aiao-io/aiao/tree/master.svg?style=svg)](https://circleci.com/gh/aiao-io/aiao/tree/master) [![codecov](https://codecov.io/gh/aiao-io/aiao/branch/master/graph/badge.svg)](https://codecov.io/gh/aiao-io/aiao) [![Crowdin](https://badges.crowdin.net/aiao-io/localized.svg)](https://crowdin.com/project/aiao-io) [![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faiao-io%2Faiao.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Faiao-io%2Faiao?ref=badge_shield) [![CodeFactor](https://www.codefactor.io/repository/github/aiao-io/aiao/badge)](https://www.codefactor.io/repository/github/aiao-io/aiao) [![Maintainability](https://api.codeclimate.com/v1/badges/a4096c9731142de97d99/maintainability)](https://codeclimate.com/github/aiao-io/aiao/maintainability) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/aiao-io/aiao.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/aiao-io/aiao/context:javascript)

Use `monorepo` style for management some `npm` package。

## Libs

Versions less than ` 1 ` are internal beta versions, please use with caution

### Elements

| Package                  | Description       | Version                                                                                                                              | Scale                                                                                                                                                                   |                                   |
| ------------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `@aiao/elements`         | web component     | [![npm](https://img.shields.io/npm/v/@aiao/elements?label=&style=flat-square)](https://www.npmjs.com/@aiao/elements)                 | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/elements?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/elements)                 | [Detail](./libs/elements)         |
| `@aiao/elements-angular` | angular version   | [![npm](https://img.shields.io/npm/v/@aiao/elements-angular?label=&style=flat-square)](https://www.npmjs.com/@aiao/elements-angular) | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/elements-angular?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/elements-angular) | [Detail](./libs/elements-angular) |
| `@aiao/elements-react`   | react version     | [![npm](https://img.shields.io/npm/v/@aiao/elements-react?label=&style=flat-square)](https://www.npmjs.com/@aiao/elements-react)     | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/elements-react?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/elements-react)     | [Detail](./libs/elements-react)   |
| `@aiao/elements-cdk`     | component Dev Kit | [![npm](https://img.shields.io/npm/v/@aiao/elements-cdk?label=&style=flat-square)](https://www.npmjs.com/@aiao/elements-cdk)         | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/elements-cdk?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/elements-cdk)         | [Detail](./libs/elements-cdk)     |

### Angular

| Package                 | Description                                   | Version                                                                                                                            | Scale                                                                                                                                                                 |                                  |
| ----------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `@aiao/lazy-module`     | lazy load `angular module`                    | [![npm](https://img.shields.io/npm/v/@aiao/lazy-module?label=&style=flat-square)](https://www.npmjs.com/@aiao/lazy-module)         | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/lazy-module?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/lazy-module)         | [Detail](./libs/lazy-module)     |
| `@aiao/lazy-element`    | lazy load `angular element`                   | [![npm](https://img.shields.io/npm/v/@aiao/lazy-element?label=&style=flat-square)](https://www.npmjs.com/@aiao/lazy-element)       | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/lazy-element?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/lazy-element)       | [Detail](./libs/lazy-element)    |
| `@aiao/lazy-component`  | lazy load any `module`'s `component`          | [![npm](https://img.shields.io/npm/v/@aiao/lazy-component?label=&style=flat-square)](https://www.npmjs.com/@aiao/lazy-component)   | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/lazy-component?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/lazy-component)   | [Detail](./libs/lazy-component)  |
| `@aiao/stencil-toolkit` | `stencil` toolkit from angular , support `nx` | [![npm](https://img.shields.io/npm/v/@aiao/stencil-toolkit?label=&style=flat-square)](https://www.npmjs.com/@aiao/stencil-toolkit) | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/stencil-toolkit?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/stencil-toolkit) | [Detail](./libs/stencil-toolkit) |

### utils

| Package               | Description                            | Version                                                                                                                        | Scale                                                                                                                                                             |                                |
| --------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `@aiao/color`         | color tool                             | [![npm](https://img.shields.io/npm/v/@aiao/color?label=&style=flat-square)](https://www.npmjs.com/@aiao/color)                 | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/color?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/color)                 | [Detail](./libs/color)         |
| `@aiao/util`          | utils                                  | [![npm](https://img.shields.io/npm/v/@aiao/util?label=&style=flat-square)](https://www.npmjs.com/@aiao/util)                   | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/util?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/util)                   | [Detail](./libs/util)          |
| `@aiao/image-storage` | online image address generator         | [![npm](https://img.shields.io/npm/v/@aiao/image-storage?label=&style=flat-square)](https://www.npmjs.com/@aiao/image-storage) | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/image-storage?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/image-storage) | [Detail](./libs/image-storage) |
| `@aiao/typeorm-plus`  | make typeorm support sequelize queries | [![npm](https://img.shields.io/npm/v/@aiao/typeorm-plus?label=&style=flat-square)](https://www.npmjs.com/@aiao/typeorm-plus)   | [![bundlephobia](https://img.shields.io/bundlephobia/minzip/@aiao/typeorm-plus?label=&style=flat-square)](https://bundlephobia.com/result?p=@aiao/typeorm-plus)   | [Detail](./libs/typeorm-plus)  |

## Project Structure

The structure mostly follows the [ Nx ](https://github.com/nrwl/nx) rule

- `apps` application directory
- `integration` directory of integrated solutions for libraries
- `libs` directory of libraries
- `tools` utils

## Install

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



<!-- npm url -->



<!-- bundlephobia -->



<!-- bundlephobia url -->



<!-- cypress -->


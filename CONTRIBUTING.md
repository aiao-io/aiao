# 贡献指南

- 欢迎 `PR`，为了更好的管理项目，所有合并到 `master` 的分支都会 `squash merge` 压缩成一条合并。
- 请使用 **[Commitizen](https://github.com/commitizen/cz-cli)** 来提交更改，在项目中运行 `yarn commit` 即可。
- 为了更自由书写代码，只有在 `master` 分支提交时会格式检查。所以在其他分支或是 `PR` 时可以随便提交，但是请在最后一条提交中遵循规则，推送 `PR` 时填入最后条提交信息作为标题和内容。

## 代码提交信息应遵循以下格式

```console
type(scope): subject
BLANK LINE
body
```

### Type

- feat
- fix
- docs
- style
- refactor
- perf
- test
- chore

### Scope

- `aiao` 非具体项目代码
- tools
- color
- date
- elements
- elements-angular
- elements-cdk
- elements-react
- image-storage
- lazy-component
- lazy-element
- lazy-module
- nest-angular-universal
- random
- stencil-toolkit
- typeorm-plus
- universal-fastify-engine
- url
- util

### `subject` 和 `body` 规定

`subject` 必须包含更改的描述，而 `body` 请尽量包含更多细节，并且请加入包含 `PR` 相关的 `issues` 编号信息，这有助于跟踪问题。

### 例子

```console
feat(elements): 添加了 xx 功能

一些功能详细说明

Close #100
```

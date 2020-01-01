# 贡献指南

一个人的力量是有限的

## git commit message

提交信息应遵循以下格式:

```console
type(scope): subject
BLANK LINE
body
```

### Type

类型必须是以下类型之一:

- feat
- fix
- docs
- style
- refactor
- perf
- test
- chore

### Scope

范围必须是下列之一:

- color
- docs
- elements
- elements-angular
- elements-cdk
- elements-react
- image-storage
- lazy-component
- lazy-element
- lazy-module
- stencil-toolkit
- typeorm-plus

### 主题和正文规定

主题必须包含更改的描述，而消息正文包含任何附加细节，以提供关于更改的更多上下文。

包括与 PR 相关的问题编号也有助于跟踪。

### 例子

```console
feat(elements): add some feat

some feature detail

Closes #100
```

### 自动化提交

为了简化和自动化使用这种格式提交的过程, 请使用
**[Commitizen](https://github.com/commitizen/cz-cli)**, 项目中运行 `yarn commit` 即可.

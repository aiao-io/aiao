# Contribution Guidelines

- Welcome ` PR `, in order to better manage the project, all branches merged into ` master ` will be ` squash merge ` compressed into one merge.
- Please use **[ Commitizen ](https://github.com/commitizen/cz-cli)** to commit changes, run ` yarn commit ` in the project.
- In order to write code more freely, format checking is performed only when the ` master ` branch commits. So you can submit in other branches or ` PR `, but please follow the rules in the last commit, and fill in the last commit information as the title and content when pushing ` PR `.

## 代码提交信息应遵循以下格式：

```console
type(scope): subject
BLANK LINE
body
```

### `type` 必须是以下类型之一：

- feat
- fix
- docs
- style
- refactor
- perf
- test
- chore

### `scope` 范围必须是下列之一：

- `aiao` 非具体项目代码
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

### `subject` 和 `body` 规定

`subject` 必须包含更改的描述，而 `body` 请尽量包含更多细节，并且请加入包含 `PR` 相关的 `issues` 编号信息，这有助于跟踪问题。

### 例子

```console
feat(elements): 添加了 xx 功能

一些功能详细说明

关闭 #100
```

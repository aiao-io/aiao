# Contribution Guidelines

- Welcome ` PR `, in order to better manage the project, all branches merged into ` master ` will be ` squash merge ` compressed into one merge.
- Please use **[ Commitizen ](https://github.com/commitizen/cz-cli)** to commit changes, run ` yarn commit ` in the project.
- In order to write code more freely, format checking is performed only when the ` master ` branch commits. So you can submit in other branches or ` PR `, but please follow the rules in the last commit, and fill in the last commit information as the title and content when pushing ` PR `.

## Commit Message Guidelines

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

- `aiao` Non-specific project code
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

### `subject` and `body` rules

` subject ` must includes a description of the changes, and ` body ` please include as much detail as possible, and please include ` PR` related to ` issues` numbering information, which helps track issues.

### Example

```console
feat(elements): 添加了 xx 功能

一些功能详细说明

Close #100
```

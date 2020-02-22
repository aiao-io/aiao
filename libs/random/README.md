[shields-random]: https://img.shields.io/npm/v/@aiao/random?style=flat-square
[npm-random]: https://www.npmjs.com/@aiao/random

# @aiao/random

[![npm][shields-random]][npm-random]

随机生成工具

## Install

```console
npm install @aiao/random
```

## Usage

## Api

### randomArrayItem

随机数组的任意项

```typescript
randomArrayItem([1, 2, 3]);
```

#### 参数

| 名字  | 类型  | 说明 |
| ----- | ----- | ---- |
| array | any[] | 数组 |

### randomFloat

随机浮点数

```typescript
randomFloat(1, 2);
```

#### 参数

| 名字 | 类型   | 说明                             |
| ---- | ------ | -------------------------------- |
| min? | number | 最小值, 默认 `MIN_SAFE_INTEGER`  |
| max? | number | 最大值 , 默认 `MAX_SAFE_INTEGER` |

### randomInt

随机整数

```typescript
randomInt(0, 10);
```

#### 参数

| 名字 | 类型   | 说明                             |
| ---- | ------ | -------------------------------- |
| min? | number | 最小值, 默认 `MIN_SAFE_INTEGER`  |
| max? | number | 最大值 , 默认 `MAX_SAFE_INTEGER` |

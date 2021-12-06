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

## API

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

### randomObjectKey

随机 object 键

```typescript
randomObjectKey({ a: 1, b: 2 });
```

#### 参数

| 名字 | 类型   | 说明 |
| ---- | ------ | ---- |
| obj  | Object |      |

### randomObjectValue

随机 object 里的值

```typescript
randomObjectValue({ a: 1, b: 2 });
```

#### 参数

| 名字 | 类型   | 说明 |
| ---- | ------ | ---- |
| obj  | Object |      |

### randomString

随机字符串

```typescript
randomString();
```

#### 参数

| 名字     | 类型   | 说明                             |
| -------- | ------ | -------------------------------- |
| size     | number | 字符串长度 默认`16`              |
| alphabet | string | 可用字母 默认 url 合法的的字符串 |

### randomUintByLength

随机指定长度的正整数

```typescript
randomUintByLength();
```

#### 参数

| 名字   | 类型   | 说明                |
| ------ | ------ | ------------------- |
| length | number | 字符串长度 默认`16` |

### randomUintString

随机指定长度由数字组成的字符串

```typescript
randomUintString();
```

#### 参数

| 名字   | 类型   | 说明                |
| ------ | ------ | ------------------- |
| length | number | 字符串长度 默认`16` |

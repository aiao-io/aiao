# @aiao/color

[![npm][shields-color]][npm-color]

处理颜色

## Install

```console
npm install @aiao/color
```

## Usage

```typescript
import { Color } from '@aiao/color';
const color = new Color();
```

## API

### Color

#### 构造函数

| 名字     | 类型   | 说明             |
| -------- | ------ | ---------------- |
| colorStr | string | 支持的颜色字符串 |

### 属性

| 名字       | 类型      | 说明      |
| ---------- | --------- | --------- |
| hsb        | ColorHSB  | HSB 颜色  |
| rgb        | ColorRGB  | RGB 颜色  |
| rgbb       | ColorRGBA | RGBA 颜色 |
| opacity    | number    | 透明度    |
| red        | number    | 红色      |
| green      | number    | 绿色      |
| blue       | number    | 蓝色      |
| hue        | number    | 色调      |
| saturation | number    | 饱和度    |
| brightness | number    | 亮度      |

### 方法

#### toString

转化颜色字符串

##### 参数

| 名字    | 类型      | 说明                              |
| ------- | --------- | --------------------------------- |
| type    | ColorType | 颜色类型 hex,rgb,rgba,hsb         |
| decimal | boolean   | 是否显示百分比，在 hsb 类型里有用 |

[shields-color]: https://img.shields.io/npm/v/@aiao/color?style=flat-square
[npm-color]: https://www.npmjs.com/@aiao/color

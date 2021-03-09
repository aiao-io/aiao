# @aiao/lazy-component

[![npm][shields-lazy-component]][npm-lazy-component]

按需加载 任意 `module` 的 `component`.

> 此方法适用 angular 8 或是 angular 9 非 `ivy` 模式中非常有用，`ivy` 模式可直接使用组件引用

## 场景

弹框弹出任意组件, 在后台页面操作数据时使用非常频繁，可以隔离模块依赖

### ivy 中使用

`ivy` 中也可以使用这种模式，弹框的内容会按 `module` 来分割代码延迟加载

> 需要继承 WithIvyLazyComponent 接口，实现 customElementComponents 属性

```ts
import { LazyComponentModule, WithIvyLazyComponent } from '@aiao/lazy-component';
import { NgModule, Type } from '@angular/core';

import { AloneDialogComponent } from './alone-dialog.component';

@NgModule({
  declarations: [AloneDialogComponent],
  imports: [LazyComponentModule]
})
export class AloneDialogModule implements WithIvyLazyComponent {
  customElementComponents: Type<any>[] = [AloneDialogComponent];
}
```

## 安装

### Angular 8

```console
yarn add @aiao/lazy-component@1.4
```

### Angular 9 非 ivy

```console
yarn add @aiao/lazy-component
```

## 使用

参考 [dev-lazy-component](../../apps/dev-lazy-component)

[shields-lazy-component]: https://img.shields.io/npm/v/@aiao/lazy-component?label=&style=flat-square
[npm-lazy-component]: https://www.npmjs.com/@aiao/lazy-component

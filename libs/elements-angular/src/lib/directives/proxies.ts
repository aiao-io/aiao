/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './proxies-utils';

import { Components } from '@aiao/elements'
import { CodeEditor as ICodeEditor } from '../@aiao/elements/lib/types/lib/components/code-diff-editor/code-diff-editor';
export declare interface AiaoCodeDiffEditor extends Components.AiaoCodeDiffEditor {}
@ProxyCmp({inputs: ['baseUrl', 'disabled', 'language', 'localizeCode', 'name', 'options', 'originalValue', 'uri', 'value'], 'methods': ['format', 'action']})
@Component({ selector: 'aiao-code-diff-editor', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['baseUrl', 'disabled', 'language', 'localizeCode', 'name', 'options', 'originalValue', 'uri', 'value'], outputs: ['aiaoChange'] })
export class AiaoCodeDiffEditor {
  /** 侦听值更改 */
  aiaoChange!: ICodeEditor['aiaoChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['aiaoChange']);
  }
}
import { CodeEditor as ICodeEditor } from '../@aiao/elements/lib/types/lib/components/code-editor/code-editor';
export declare interface AiaoCodeEditor extends Components.AiaoCodeEditor {}
@ProxyCmp({inputs: ['baseUrl', 'disabled', 'language', 'localizeCode', 'name', 'options', 'uri', 'value'], 'methods': ['format', 'action']})
@Component({ selector: 'aiao-code-editor', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['baseUrl', 'disabled', 'language', 'localizeCode', 'name', 'options', 'uri', 'value'], outputs: ['aiaoChange'] })
export class AiaoCodeEditor {
  /**  */
  aiaoChange!: ICodeEditor['aiaoChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['aiaoChange']);
  }
}

export declare interface AiaoElementsEditor extends Components.AiaoElementsEditor {}
@ProxyCmp({inputs: ['config', 'disabled', 'editMode', 'name', 'value', 'view']})
@Component({ selector: 'aiao-elements-editor', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['config', 'disabled', 'editMode', 'name', 'value', 'view'] })
export class AiaoElementsEditor {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
import { ElementsFrom as IElementsFrom } from '../@aiao/elements/lib/types/lib/components/elements-form/elements-form';
export declare interface AiaoElementsForm extends Components.AiaoElementsForm {}
@ProxyCmp({inputs: ['html', 'value'], 'methods': ['values', 'flattenPathValues', 'getValue', 'setValue', 'setValues', 'reset', 'markAsPristine', 'markAsDirty']})
@Component({ selector: 'aiao-elements-form', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['html', 'value'], outputs: ['aiaoChange', 'aiaoInput'] })
export class AiaoElementsForm {
  /** 侦听值改变 */
  aiaoChange!: IElementsFrom['aiaoChange'];
  /** 侦听输入改变 */
  aiaoInput!: IElementsFrom['aiaoInput'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['aiaoChange', 'aiaoInput']);
  }
}

export declare interface AiaoElementsPreview extends Components.AiaoElementsPreview {}
@ProxyCmp({inputs: ['config', 'editMode', 'value']})
@Component({ selector: 'aiao-elements-preview', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['config', 'editMode', 'value'] })
export class AiaoElementsPreview {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface AiaoElementsView extends Components.AiaoElementsView {}
@ProxyCmp({inputs: ['css', 'html', 'js']})
@Component({ selector: 'aiao-elements-view', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['css', 'html', 'js'] })
export class AiaoElementsView {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
import { Img as IImg } from '../@aiao/elements/lib/types/lib/components/img/img';
export declare interface AiaoImg extends Components.AiaoImg {}
@ProxyCmp({inputs: ['alt', 'animation', 'map', 'method', 'platform', 'src'], 'methods': ['reload']})
@Component({ selector: 'aiao-img', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['alt', 'animation', 'map', 'method', 'platform', 'src'], outputs: ['aiaoImgDidLoad', 'aiaoError'] })
export class AiaoImg {
  /** 图片被加载 */
  aiaoImgDidLoad!: IImg['aiaoImgDidLoad'];
  /** 图片加载错误 */
  aiaoError!: IImg['aiaoError'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['aiaoImgDidLoad', 'aiaoError']);
  }
}
import { RichTextEditor as IRichTextEditor } from '../@aiao/elements/lib/types/lib/components/text-editor/text-editor';
export declare interface AiaoTextEditor extends Components.AiaoTextEditor {}
@ProxyCmp({inputs: ['defaultParagraphSeparator', 'disabled', 'element', 'name', 'showActionBar', 'value'], 'methods': ['getSelectionElements', 'saveSelection', 'restoreSelection', 'action']})
@Component({ selector: 'aiao-text-editor', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['defaultParagraphSeparator', 'disabled', 'element', 'name', 'showActionBar', 'value'], outputs: ['aiaoChange', 'aiaoStateChange'] })
export class AiaoTextEditor {
  /** 值改变 */
  aiaoChange!: IRichTextEditor['aiaoChange'];
  /**  */
  aiaoStateChange!: IRichTextEditor['aiaoStateChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['aiaoChange', 'aiaoStateChange']);
  }
}
import { Tree as ITree } from '../@aiao/elements/lib/types/lib/components/tree/tree';
export declare interface AiaoTree extends Components.AiaoTree {}
@ProxyCmp({inputs: ['autoExpandParent', 'canDrag', 'checkable', 'config', 'data', 'defaultExpandLevel', 'defaultExpandParent', 'defaultExpandedKeys', 'defaultSelectedKeys', 'disabled', 'multiple', 'selectable', 'showIcon', 'showLine', 'showMode'], 'methods': ['canDrop', 'select', 'overElement', 'outElement', 'nodeRefMap']})
@Component({ selector: 'aiao-tree', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['autoExpandParent', 'canDrag', 'checkable', 'config', 'data', 'defaultExpandLevel', 'defaultExpandParent', 'defaultExpandedKeys', 'defaultSelectedKeys', 'disabled', 'multiple', 'selectable', 'showIcon', 'showLine', 'showMode'], outputs: ['aiaoChange', 'aiaoTreeNodeChange', 'aiaoTreeDrop'] })
export class AiaoTree {
  /** change */
  aiaoChange!: ITree['aiaoChange'];
  /** 改变的数据节点 */
  aiaoTreeNodeChange!: ITree['aiaoTreeNodeChange'];
  /** tree drop */
  aiaoTreeDrop!: ITree['aiaoTreeDrop'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['aiaoChange', 'aiaoTreeNodeChange', 'aiaoTreeDrop']);
  }
}

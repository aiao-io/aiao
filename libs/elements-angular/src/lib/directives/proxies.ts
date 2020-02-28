/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './proxies-utils';

import { Components } from '@aiao/elements'

export declare interface AiaoCodeDiffEditor extends Components.AiaoCodeDiffEditor {}
@ProxyCmp({inputs: ['baseUrl', 'disabled', 'language', 'localizeCode', 'name', 'options', 'originalValue', 'uri', 'value'], 'methods': ['format']})
@Component({ selector: 'aiao-code-diff-editor', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['baseUrl', 'disabled', 'language', 'localizeCode', 'name', 'options', 'originalValue', 'uri', 'value'] })
export class AiaoCodeDiffEditor {
  aiaoChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['aiaoChange']);
  }
}

export declare interface AiaoCodeEditor extends Components.AiaoCodeEditor {}
@ProxyCmp({inputs: ['baseUrl', 'disabled', 'language', 'localizeCode', 'name', 'options', 'uri', 'value'], 'methods': ['format']})
@Component({ selector: 'aiao-code-editor', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['baseUrl', 'disabled', 'language', 'localizeCode', 'name', 'options', 'uri', 'value'] })
export class AiaoCodeEditor {
  aiaoChange!: EventEmitter<CustomEvent>;
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

export declare interface AiaoElementsEditorPreview extends Components.AiaoElementsEditorPreview {}
@ProxyCmp({inputs: ['config', 'editMode', 'value']})
@Component({ selector: 'aiao-elements-editor-preview', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['config', 'editMode', 'value'] })
export class AiaoElementsEditorPreview {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface AiaoElementsForm extends Components.AiaoElementsForm {}
@ProxyCmp({inputs: ['html', 'schema', 'value'], 'methods': ['values', 'flattenPathValues', 'getValue', 'setValue', 'setValues', 'reset', 'markAsPristine', 'markAsDirty']})
@Component({ selector: 'aiao-elements-form', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['html', 'schema', 'value'] })
export class AiaoElementsForm {
  aiaoChange!: EventEmitter<CustomEvent>;
  aiaoInput!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['aiaoChange', 'aiaoInput']);
  }
}

export declare interface AiaoElementsView extends Components.AiaoElementsView {}
@ProxyCmp({inputs: ['html']})
@Component({ selector: 'aiao-elements-view', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['html'] })
export class AiaoElementsView {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface AiaoImg extends Components.AiaoImg {}
@ProxyCmp({inputs: ['alt', 'animation', 'map', 'method', 'platform', 'src'], 'methods': ['reload']})
@Component({ selector: 'aiao-img', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['alt', 'animation', 'map', 'method', 'platform', 'src'] })
export class AiaoImg {
  aiaoImgDidLoad!: EventEmitter<CustomEvent>;
  ionError!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['aiaoImgDidLoad', 'ionError']);
  }
}

export declare interface AiaoTextEditor extends Components.AiaoTextEditor {}
@ProxyCmp({inputs: ['defaultParagraphSeparator', 'disabled', 'edit', 'element', 'name', 'placeholder', 'value'], 'methods': ['bold', 'italic', 'underline', 'strikethrough', 'heading', 'paragraph', 'backColor', 'foreColor', 'quote', 'indent', 'outdent', 'olist', 'ulist', 'line', 'insertHTML', 'link', 'unlink', 'image', 'alginCenter', 'alginLeft', 'alginFull', 'alginRight', 'undo', 'redo', 'getSelectionElements', 'saveSelection', 'restoreSelection']})
@Component({ selector: 'aiao-text-editor', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['defaultParagraphSeparator', 'disabled', 'edit', 'element', 'name', 'placeholder', 'value'] })
export class AiaoTextEditor {
  mlabChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mlabChange']);
  }
}

export declare interface AiaoTree extends Components.AiaoTree {}
@ProxyCmp({inputs: ['autoExpandParent', 'canDrag', 'checkable', 'config', 'data', 'defaultExpandLevel', 'defaultExpandParent', 'defaultExpandedKeys', 'defaultSelectedKeys', 'disabled', 'multiple', 'selectable', 'showIcon', 'showLine', 'showMode'], 'methods': ['canDrop', 'select', 'overElement', 'outElement', 'nodeRefMap']})
@Component({ selector: 'aiao-tree', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['autoExpandParent', 'canDrag', 'checkable', 'config', 'data', 'defaultExpandLevel', 'defaultExpandParent', 'defaultExpandedKeys', 'defaultSelectedKeys', 'disabled', 'multiple', 'selectable', 'showIcon', 'showLine', 'showMode'] })
export class AiaoTree {
  mlabChange!: EventEmitter<CustomEvent>;
  mlabTreeNodeChange!: EventEmitter<CustomEvent>;
  mlabTreeDrop!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mlabChange', 'mlabTreeNodeChange', 'mlabTreeDrop']);
  }
}

export declare interface AiaoTreeNode extends Components.AiaoTreeNode {}
@ProxyCmp({inputs: ['canDrag', 'checkable', 'disabled', 'expanded', 'hover', 'icon', 'isLeaf', 'name', 'selectable', 'selected', 'showIcon', 'showLine', 'value']})
@Component({ selector: 'aiao-tree-node', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['canDrag', 'checkable', 'disabled', 'expanded', 'hover', 'icon', 'isLeaf', 'name', 'selectable', 'selected', 'showIcon', 'showLine', 'value'] })
export class AiaoTreeNode {
  mlabTreeNodeDragStart!: EventEmitter<CustomEvent>;
  mlabTreeNodeDragEnter!: EventEmitter<CustomEvent>;
  mlabTreeNodeDragOver!: EventEmitter<CustomEvent>;
  mlabTreeNodeDragLeave!: EventEmitter<CustomEvent>;
  mlabTreeNodeDrop!: EventEmitter<CustomEvent>;
  mlabTreeNodeDragEnd!: EventEmitter<CustomEvent>;
  mlabTreeNodeClick!: EventEmitter<CustomEvent>;
  mlabTreeNodeOver!: EventEmitter<CustomEvent>;
  mlabTreeNodeOut!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mlabTreeNodeDragStart', 'mlabTreeNodeDragEnter', 'mlabTreeNodeDragOver', 'mlabTreeNodeDragLeave', 'mlabTreeNodeDrop', 'mlabTreeNodeDragEnd', 'mlabTreeNodeClick', 'mlabTreeNodeOver', 'mlabTreeNodeOut']);
  }
}

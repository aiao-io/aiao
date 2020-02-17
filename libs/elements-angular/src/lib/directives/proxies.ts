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
@ProxyCmp({inputs: ['config', 'editMode', 'value', 'view']})
@Component({ selector: 'aiao-elements-editor', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['config', 'editMode', 'value', 'view'] })
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

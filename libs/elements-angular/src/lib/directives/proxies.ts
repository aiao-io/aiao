/* eslint-disable */
/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from "@angular/core";
import { ProxyCmp, proxyOutputs } from "./proxies-utils";
import { Components } from "@aiao/elements";
export declare interface AiaoCodeDiffEditor extends Components.AiaoCodeDiffEditor {
}
@ProxyCmp({ inputs: ["baseUrl", "disabled", "language", "localizeCode", "name", "options", "originalValue", "uri", "value"], "methods": ["format", "action"] })
@Component({ selector: "aiao-code-diff-editor", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["baseUrl", "disabled", "language", "localizeCode", "name", "options", "originalValue", "uri", "value"] })
export class AiaoCodeDiffEditor {
  aiaoChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["aiaoChange"]);
  }
}
export declare interface AiaoCodeEditor extends Components.AiaoCodeEditor {
}
@ProxyCmp({ inputs: ["baseUrl", "disabled", "language", "localizeCode", "name", "options", "uri", "value"], "methods": ["format", "action"] })
@Component({ selector: "aiao-code-editor", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["baseUrl", "disabled", "language", "localizeCode", "name", "options", "uri", "value"] })
export class AiaoCodeEditor {
  aiaoChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["aiaoChange"]);
  }
}
export declare interface AiaoElementsEditor extends Components.AiaoElementsEditor {
}
@ProxyCmp({ inputs: ["config", "disabled", "editMode", "name", "value", "view"] })
@Component({ selector: "aiao-elements-editor", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["config", "disabled", "editMode", "name", "value", "view"] })
export class AiaoElementsEditor {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface AiaoElementsForm extends Components.AiaoElementsForm {
}
@ProxyCmp({ inputs: ["html", "value"], "methods": ["values", "flattenPathValues", "getValue", "setValue", "setValues", "reset", "markAsPristine", "markAsDirty"] })
@Component({ selector: "aiao-elements-form", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["html", "value"] })
export class AiaoElementsForm {
  aiaoChange!: EventEmitter<CustomEvent>;
  aiaoInput!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["aiaoChange", "aiaoInput"]);
  }
}
export declare interface AiaoElementsPreview extends Components.AiaoElementsPreview {
}
@ProxyCmp({ inputs: ["config", "editMode", "value"] })
@Component({ selector: "aiao-elements-preview", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["config", "editMode", "value"] })
export class AiaoElementsPreview {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface AiaoElementsView extends Components.AiaoElementsView {
}
@ProxyCmp({ inputs: ["css", "html", "js"] })
@Component({ selector: "aiao-elements-view", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["css", "html", "js"] })
export class AiaoElementsView {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface AiaoImg extends Components.AiaoImg {
}
@ProxyCmp({ inputs: ["alt", "animation", "map", "method", "platform", "src"], "methods": ["reload"] })
@Component({ selector: "aiao-img", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["alt", "animation", "map", "method", "platform", "src"] })
export class AiaoImg {
  aiaoImgDidLoad!: EventEmitter<CustomEvent>;
  aiaoError!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["aiaoImgDidLoad", "aiaoError"]);
  }
}
export declare interface AiaoTextEditor extends Components.AiaoTextEditor {
}
@ProxyCmp({ inputs: ["defaultParagraphSeparator", "disabled", "element", "name", "showActionBar", "value"], "methods": ["getSelectionElements", "saveSelection", "restoreSelection", "action"] })
@Component({ selector: "aiao-text-editor", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["defaultParagraphSeparator", "disabled", "element", "name", "showActionBar", "value"] })
export class AiaoTextEditor {
  aiaoChange!: EventEmitter<CustomEvent>;
  aiaoStateChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["aiaoChange", "aiaoStateChange"]);
  }
}
export declare interface AiaoTree extends Components.AiaoTree {
}
@ProxyCmp({ inputs: ["autoExpandParent", "canDrag", "checkable", "config", "data", "defaultExpandLevel", "defaultExpandParent", "defaultExpandedKeys", "defaultSelectedKeys", "disabled", "multiple", "selectable", "showIcon", "showLine", "showMode"], "methods": ["canDrop", "select", "overElement", "outElement", "nodeRefMap"] })
@Component({ selector: "aiao-tree", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["autoExpandParent", "canDrag", "checkable", "config", "data", "defaultExpandLevel", "defaultExpandParent", "defaultExpandedKeys", "defaultSelectedKeys", "disabled", "multiple", "selectable", "showIcon", "showLine", "showMode"] })
export class AiaoTree {
  aiaoChange!: EventEmitter<CustomEvent>;
  aiaoTreeNodeChange!: EventEmitter<CustomEvent>;
  aiaoTreeDrop!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["aiaoChange", "aiaoTreeNodeChange", "aiaoTreeDrop"]);
  }
}

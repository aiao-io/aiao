import toNumber from 'lodash/toNumber';

import { renderHiddenInput } from '@aiao/elements-cdk';
import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import { InputChangeEventDetail } from '../../interfaces/input.interface';
import { getSelectionElements, restoreRange, saveRange } from '../../utils/selection';

// https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand
@Component({
  tag: 'aiao-text-editor',
  styleUrl: 'text-editor.scss',
  assetsDir: 'assets/text-editor',
  shadow: true
})
export class RichTextEditor {
  @Element() el!: HTMLElement;
  private range: Range;
  private _lastElement: HTMLElement;

  // --------------------------------------------------------------[ Event ]

  /**
   * 值改变
   */
  @Event() mlabChange: EventEmitter<InputChangeEventDetail>;

  // --------------------------------------------------------------[ State ]

  @State() editable = false;
  @State() _state: any = {};

  // --------------------------------------------------------------[ Prop ]
  @Prop() placeholder = '请输入...';

  /**
   * 段落符
   */
  @Prop() defaultParagraphSeparator = 'p';

  /**
   * 编辑模式
   */
  @Prop({ mutable: true }) value = '';
  @Prop() disabled = false;
  @Prop() edit = true;

  @Prop() name: string;
  @Prop() element: HTMLElement;

  // --------------------------------------------------------------[ Watch ]
  @Watch('element')
  elementChanged(value: HTMLElement) {
    if (this._lastElement !== value && value) {
      if (this._lastElement) {
        this._lastElement.removeEventListener('keyup', this.statChange);
        this._lastElement.removeEventListener('mouseup', this.statChange);
        this._lastElement.removeEventListener('input', this.onInput);
        this._lastElement.removeEventListener('focus', this.onFocus);
        this._lastElement.removeEventListener('blur', this.onBlur);
      }
      this._lastElement = value;
      this._lastElement.addEventListener('keyup', this.statChange);
      this._lastElement.addEventListener('mouseup', this.statChange);
      this._lastElement.addEventListener('input', this.onInput);
      this._lastElement.addEventListener('focus', this.onFocus);
      this._lastElement.addEventListener('blur', this.onBlur);
    }
    this.element.contentEditable = 'true';
  }
  //

  // --------------------------------------------------------------[ public function ]
  /**
   * 粗体
   */
  @Method()
  async bold() {
    this.exec('bold');
    this.statChange();
  }

  /**
   * 斜体
   */
  @Method()
  async italic() {
    this.exec('italic');
    this.statChange();
  }

  /**
   * 下划线
   */
  @Method()
  async underline() {
    this.exec('underline');
    this.statChange();
  }

  /**
   * 删除线
   */
  @Method()
  async strikethrough() {
    this.exec('strikethrough');
    this.statChange();
  }

  /**
   * 标题
   */
  @Method()
  async heading(val = 1) {
    this.exec('formatBlock', `h${val}`);
    this.statChange();
  }

  /**
   * 段落
   */
  @Method()
  async paragraph(defaultParagraphSeparator?: string) {
    this.exec('formatBlock', defaultParagraphSeparator || this.defaultParagraphSeparator);
  }

  /**
   * 背景颜色
   */
  @Method()
  async backColor(value: string) {
    this.exec('backColor', value);
  }

  /**
   * 字体颜色
   */
  @Method()
  async foreColor(value: string) {
    this.exec('foreColor', value);
  }

  /**
   * 引用
   */
  @Method()
  async quote() {
    if (this.queryCommandValue('formatBlock') === 'blockquote') {
      this.exec('formatBlock', this.defaultParagraphSeparator);
    } else {
      this.exec('formatBlock', 'blockquote');
    }
  }

  /**
   * 缩进
   */
  @Method()
  async indent() {
    this.exec('indent');
  }
  /**
   * 减少缩进
   */
  @Method()
  async outdent() {
    this.exec('outdent');
    this.checkEle();
  }

  /**
   * 有序列表
   */
  @Method()
  async olist() {
    this.exec('insertOrderedList');
  }

  /**
   * 无序列表
   */
  @Method()
  async ulist() {
    this.exec('insertUnorderedList');
  }

  /**
   * 分隔列表
   */
  @Method()
  async line() {
    this.exec('insertHorizontalRule');
  }

  /**
   * 插入 html
   */
  @Method()
  async insertHTML(val: string) {
    this.exec('insertHTML', val.trim());
  }

  /**
   * 链接
   */
  @Method()
  async link(url: string) {
    this.exec('createLink', url);
  }

  /**
   * 去除链接
   */
  @Method()
  async unlink() {
    this.exec('unlink');
  }

  /**
   * 图片
   */
  @Method()
  async image(url: string) {
    this.exec('insertImage', url);
    console.log('insertImage', document.queryCommandSupported('insertImage'));
  }

  /**
   * 居中
   */
  @Method()
  async alginCenter() {
    this.exec('justifyCenter');
    this.statChange();
  }

  /**
   * 左对齐
   */
  @Method()
  async alginLeft() {
    this.exec('justifyLeft');
    this.statChange();
  }

  /**
   * 两边对齐
   */
  @Method()
  async alginFull() {
    this.exec('justifyFull');
    this.statChange();
  }

  /**
   * 右对齐
   */
  @Method()
  async alginRight() {
    this.exec('justifyRight');
    this.statChange();
  }

  /**
   * 撤销
   */
  @Method()
  async undo() {
    this.exec('undo');
  }

  /**
   * 重做
   */
  @Method()
  async redo() {
    this.exec('redo');
  }
  /**
   * 字体大小
   */
  fontSize(value: number) {
    this.exec('fontSize', value);
  }

  /**
   * 得到选中的标签
   */
  @Method()
  async getSelectionElements() {
    return getSelectionElements(this.el.shadowRoot || document);
  }

  /**
   * 记录选择位置
   */
  @Method()
  async saveSelection() {
    this._saveSelection();
  }

  /**
   * 恢复选择位置
   */
  @Method()
  async restoreSelection() {
    this._restoreSelection();
  }

  // --------------------------------------------------------------[ Listen ]

  onInput = () => {
    this.checkEle();
    this.value = this.element.innerHTML;
    this.mlabChange.emit({ value: this.value });
  };

  onFocus = (_: Event) => {
    console.log('focus');
  };

  onBlur = (_: Event) => {
    //
    console.log('blur');
  };

  // --------------------------------------------------------------[ public function ]

  private _restoreSelection() {
    if (this.range) {
      restoreRange(document, this.range);
    }
  }
  private _saveSelection() {
    this.range = saveRange(document);
  }

  // --------------------------------------------------------------[ event Handler ]

  async foreColorChanged(ev: CustomEvent<any>) {
    ev.preventDefault();
    ev.stopPropagation();
    await this.restoreSelection();
    await this.foreColor(ev.detail.value);
  }

  async backColorChanged(ev: CustomEvent<any>) {
    ev.preventDefault();
    ev.stopPropagation();
    // await this.restoreSelection();
    // await this.backColor(ev.detail.value);
  }

  async linkChanged(ev: CustomEvent<string>) {
    ev.preventDefault();
    ev.stopPropagation();
    await this.restoreSelection();
    await this.link(ev.detail);
  }

  // --------------------------------------------------------------[ private function ]
  private statChange = () => {
    this._state = this.getState();
  };

  // 检测元素, 保证文本使用 p 标签
  private checkEle() {
    if (this.element.firstChild && this.element.firstChild.nodeType === 3) {
      this.exec('formatBlock', this.defaultParagraphSeparator);
    }
  }

  private getSelectionAttributeValue(attribute: string) {
    const _doc = this.el.shadowRoot || document;
    const selection = _doc.getSelection();
    if (selection.rangeCount < 1) {
      return '';
    }
    const range = selection.getRangeAt(0);
    const pe = range.commonAncestorContainer.parentElement;
    return pe ? pe.getAttribute(attribute) : '';
  }

  private getState() {
    const fb = this.queryCommandValue('formatBlock');
    return {
      bold: this.queryCommandState('bold'),
      italic: this.queryCommandState('italic'),
      underline: this.queryCommandState('underline'),
      strikeThrough: this.queryCommandState('strikeThrough'),
      backColor: this.queryCommandValue('backColor'),
      foreColor: this.queryCommandValue('foreColor'),
      fontSize: this.queryCommandValue('fontSize'),
      alginLeft: this.queryCommandValue('justifyLeft') === 'true',
      alginCenter: this.queryCommandValue('justifyCenter') === 'true',
      alginRight: this.queryCommandValue('justifyRight') === 'true',
      alginFull: this.queryCommandValue('justifyFull') === 'true',
      blockquote: fb === 'blockquote',
      h1: fb === 'h1',
      h2: fb === 'h2',
      h3: fb === 'h3',
      hrefValue: this.getSelectionAttributeValue('href')
    };
  }

  private queryCommandState(commandId: string) {
    return document.queryCommandState(commandId);
  }

  private queryCommandValue(commandId: string) {
    return document.queryCommandValue(commandId);
  }

  private exec(commandId: any, value?: any) {
    return document.execCommand(commandId, true, value);
  }

  private fontSizeChange(e: Event) {
    e.preventDefault();
    const { value } = e.target as any;
    const size = toNumber(value);
    this.fontSize(size);
  }

  // --------------------------------------------------------------[ lifecycle ]

  componentWillLoad() {
    this.element.innerHTML = this.value || '';
    this.exec('defaultParagraphSeparator', this.defaultParagraphSeparator);
  }

  componentDidLoad() {
    if (this.element) {
      this.elementChanged(this.element);
    }
  }

  render() {
    renderHiddenInput(true, this.el, this.name, this.value, this.disabled);
    // const {
    //   bold,
    //   italic,
    //   underline,
    //   strikeThrough,
    //   // backColor,
    //   foreColor,
    //   fontSize,
    //   alginLeft,
    //   alginCenter,
    //   alginRight,
    //   alginFull,
    //   blockquote,
    //   h1,
    //   h2,
    //   h3
    // } = this._state;
    const cls = {
      edit: this.edit
    };
    return <Host class={cls}>{this.edit && <text-editor-bar></text-editor-bar>}</Host>;
  }
}

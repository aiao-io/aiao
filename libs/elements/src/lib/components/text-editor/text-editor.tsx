import toNumber from 'lodash/toNumber';

import { renderHiddenInput } from '@aiao/elements-cdk';
import { Component, Element, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';

import { config } from '../../global/config';
import { getSelectionElements, restoreRange, saveRange } from '../../utils/selection';
import { InputChangeEventDetail } from '../../interfaces/input.interface';

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
  private options = ['1', '2', '3', '4', '5', '6', '7'];
  private resourcesUrl: string = config.get('resourcesUrl');
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
        this._lastElement.addEventListener('input', this.onInput);
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
  hostData() {
    return {
      class: {
        edit: this.edit
      }
    };
  }

  render() {
    renderHiddenInput(true, this.el, this.name, this.value, this.disabled);
    const {
      bold,
      italic,
      underline,
      strikeThrough,
      // backColor,
      foreColor,
      fontSize,
      alginLeft,
      alginCenter,
      alginRight,
      alginFull,
      blockquote,
      h1,
      h2,
      h3
    } = this._state;
    return [
      this.edit && (
        <div class="action-bar">
          <ion-button fill={bold ? 'solid' : 'clear'} onClick={() => this.bold()}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/bold.svg`} />
          </ion-button>
          <ion-button fill={italic ? 'solid' : 'clear'} onClick={() => this.italic()}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/italic.svg`} />
          </ion-button>
          <ion-button fill={underline ? 'solid' : 'clear'} onClick={() => this.underline()}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/underline.svg`} />
          </ion-button>
          <ion-button fill={strikeThrough ? 'solid' : 'clear'} onClick={() => this.strikethrough()}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/strikeThrough.svg`} />
          </ion-button>
          <ion-button fill={h1 ? 'solid' : 'clear'} onClick={() => this.heading(1)}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/h1.svg`} />
          </ion-button>
          <ion-button fill={h2 ? 'solid' : 'clear'} onClick={() => this.heading(2)}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/h2.svg`} />
          </ion-button>
          <ion-button fill={h3 ? 'solid' : 'clear'} onClick={() => this.heading(3)}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/h3.svg`} />
          </ion-button>
          <ion-button fill="clear" onClick={() => this.paragraph()}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/paragraph.svg`} />
          </ion-button>
          <ion-button fill="clear" onClick={() => this.olist()}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/list-ol.svg`} />
          </ion-button>
          <ion-button fill="clear" onClick={() => this.ulist()}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/list-ul.svg`} />
          </ion-button>
          <ion-button fill={blockquote ? 'solid' : 'clear'} onClick={() => this.quote()}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/quote.svg`} />
          </ion-button>
          <ion-button fill="clear" onClick={() => this.line()}>
            <ion-icon name="return-down-back-outline"></ion-icon>
          </ion-button>
          <select onChange={e => this.fontSizeChange(e)}>
            {this.options.map(option => (
              <option value={option} selected={fontSize === option}>
                {option}
              </option>
            ))}
          </select>
          <mlab-color
            value={foreColor}
            onMlabOpen={() => this._saveSelection()}
            onMlabChange={(ev: any) => this.foreColorChanged(ev)}
          >
            文字
          </mlab-color>
          <ion-button fill="clear" onClick={() => this.indent()}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/indent.svg`} />
          </ion-button>
          <ion-button fill="clear" onClick={() => this.outdent()}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/outdent.svg`} />
          </ion-button>
          <ion-button fill={alginLeft ? 'solid' : 'clear'} onClick={() => this.alginLeft()}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/align-left.svg`} />
          </ion-button>
          <ion-button fill={alginCenter ? 'solid' : 'clear'} onClick={() => this.alginCenter()}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/align-center.svg`} />
          </ion-button>
          <ion-button fill={alginRight ? 'solid' : 'clear'} onClick={() => this.alginRight()}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/align-right.svg`} />
          </ion-button>
          <ion-button fill={alginFull ? 'solid' : 'clear'} onClick={() => this.alginFull()}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/align-justify.svg`} />
          </ion-button>
          <ion-button fill="clear" onClick={() => this.undo()}>
            <ion-icon slot="icon-only" name="arrow-undo-outline"></ion-icon>
          </ion-button>
          <ion-button fill="clear" onClick={() => this.redo()}>
            <ion-icon slot="icon-only" name="arrow-redo-outline" />
          </ion-button>
          <ion-button fill="clear" onClick={() => this.unlink()}>
            <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/unlink.svg`} />
          </ion-button>
        </div>
      )
    ];
  }
}

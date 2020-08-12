import { renderHiddenInput } from '@aiao/elements-cdk';
import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import { InputChangeEventDetail } from '../../interfaces/input.interface';
import { docGetSelection, getSelectionElements, restoreRange, saveRange } from '../../utils/selection';
import { TextActionState } from '../text-editor-bar/text-editor-bar.interface';
import { TextEditorAcitons as TA } from './text-editor.interface';

const IGNORE_ACTIONS = [TA.heading, TA.undo, TA.redo, TA.createLink, TA.indent, TA.outdent, TA.quote];
let richTextEditorInputId = 0;
// https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand

@Component({
  tag: 'aiao-text-editor',
  styleUrl: 'text-editor.scss',
  shadow: true
})
export class RichTextEditor {
  @Element() el!: HTMLElement;
  private range?: Range;
  private _lastElement?: HTMLElement;
  private inputId = `aiao-text-editor:${richTextEditorInputId++}`;

  // --------------------------------------------------------------[ Event ]

  /**
   * 值改变
   */
  @Event() aiaoChange!: EventEmitter<InputChangeEventDetail>;
  @Event() aiaoStateChange!: EventEmitter<TextActionState>;

  // --------------------------------------------------------------[ State ]

  @State() editable = false;
  @State() _state: TextActionState = {};

  // --------------------------------------------------------------[ Prop ]

  /**
   * 显示命令条
   */
  @Prop() showActionBar = true;
  /**
   * 段落符
   */
  @Prop() defaultParagraphSeparator = 'p';
  /**
   * 禁用
   */
  @Prop() disabled = false;
  /**
   * 绑定的 dom 元素
   */
  @Prop() element?: HTMLElement;
  /**
   * form name
   */
  @Prop() name = this.inputId;
  /**
   * form value
   */
  @Prop({ mutable: true }) value = '';

  // --------------------------------------------------------------[ Watch ]
  @Watch('element')
  elementChanged(value?: HTMLElement) {
    if (this._lastElement !== value && value) {
      if (this._lastElement) {
        this._lastElement.removeEventListener('keyup', this.statChangeHander);
        this._lastElement.removeEventListener('mouseup', this.statChangeHander);
        this._lastElement.removeEventListener('input', this.onInput);
        this._lastElement.removeEventListener('focus', this.onFocus);
        this._lastElement.removeEventListener('blur', this.onBlur);
      }
      this._lastElement = value;
      this._lastElement.addEventListener('keyup', this.statChangeHander);
      this._lastElement.addEventListener('mouseup', this.statChangeHander);
      this._lastElement.addEventListener('input', this.onInput);
      this._lastElement.addEventListener('focus', this.onFocus);
      this._lastElement.addEventListener('blur', this.onBlur);
      this._lastElement.contentEditable = 'true';
    }
  }
  //

  // --------------------------------------------------------------[ public function ]

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

  async action(
    action:
      | TA.bold
      | TA.indent
      | TA.insertHorizontalRule
      | TA.insertOrderedList
      | TA.insertUnorderedList
      | TA.italic
      | TA.redo
      | TA.strikeThrough
      | TA.underline
      | TA.undo
      | TA.unlink
      | TA.outdent
      | TA.justifyCenter
      | TA.justifyFull
      | TA.justifyLeft
      | TA.justifyRight
  ): Promise<any>;
  async action(
    action: TA.foreColor | TA.createLink | TA.foreColor | TA.insertHTML | TA.insertImage,
    value: string
  ): Promise<any>;
  async action(action: TA.fontSize | TA.heading, value: number): Promise<any>;
  /**
   * 执行命令
   * @param action 命令
   * @param value 值
   */
  @Method()
  async action(action: TA, value?: any) {
    switch (action) {
      case TA.bold:
      case TA.indent:
      case TA.insertHorizontalRule:
      case TA.insertOrderedList:
      case TA.insertUnorderedList:
      case TA.italic:
      case TA.justifyCenter:
      case TA.justifyFull:
      case TA.justifyLeft:
      case TA.justifyRight:
      case TA.outdent:
      case TA.redo:
      case TA.strikeThrough:
      case TA.underline:
      case TA.undo:
      case TA.unlink:
        this.exec(action);
        break;
      case TA.backColor:
      case TA.createLink:
      case TA.foreColor:
      case TA.insertHTML:
      case TA.insertImage:
        this.exec(action, (value || '').trim());
        break;
      case TA.fontSize:
        this.exec(action, value);
        break;
      case TA.heading:
        this.exec('formatBlock', `h${value}`);
        break;
      case TA.paragraph:
      case TA.quote:
        const { insertOrderedList, insertUnorderedList } = this._state;
        if (!(insertOrderedList || insertUnorderedList)) {
          if (action === TA.paragraph) {
            this.exec('formatBlock', value || this.paragraphSeparator);
          } else {
            this.exec('formatBlock', 'blockquote');
          }
        }
        break;
      default:
        break;
    }
    this.statChangeHander();
  }

  // --------------------------------------------------------------[ Listen ]

  onInput = () => {
    this.checkEle();
    this.value = this._lastElement!.innerHTML;
    this.aiaoChange.emit({ value: this.value });
  };

  onFocus = (_: Event) => {
    //
  };

  onBlur = (_: Event) => {
    //
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

  private onAction = (event: CustomEvent<any>) => {
    const { action, value } = event.detail;
    this.action(action, value);
  };

  // --------------------------------------------------------------[ private function ]
  private statChangeHander = () => {
    this._state = this.getState();
    this.aiaoStateChange.emit(this._state);
  };

  private get paragraphSeparator() {
    return this.defaultParagraphSeparator || 'p';
  }

  // 检测元素, 保证文本使用 p 标签
  private checkEle() {
    if (this._lastElement?.firstChild && this._lastElement.firstChild.nodeType === 3) {
      this.exec('formatBlock', this.paragraphSeparator);
    }
  }

  private getSelectionAttributeValue(attribute: string) {
    let selection = docGetSelection(document);
    if (this._lastElement) {
      selection = docGetSelection(this._lastElement.ownerDocument);
    }
    if (selection.rangeCount < 1) {
      return '';
    }
    const range = selection.getRangeAt(0);
    const pe = range.commonAncestorContainer.parentElement;
    return pe ? pe.getAttribute(attribute) : '';
  }

  private getState() {
    const backState: TextActionState = {};
    const fb = this.queryCommandValue('formatBlock');
    if (fb === 'blockquote') {
      backState[TA.quote] = true;
    }
    // heading
    const heading = /^h(?<heading>\d+)$/i.exec(fb)?.groups?.heading;
    if (heading) {
      backState[TA.heading] = +heading;
    }

    // link
    const href = this.getSelectionAttributeValue('href');
    if (href) {
      backState.createLink = href;
    }

    Object.keys(TA)
      .filter(key => IGNORE_ACTIONS.includes(key as any) === false)
      .forEach(key => {
        let val: any = this.queryCommandValue(key);
        if (val === 'false' || val === '') {
          return;
        }
        if (val === 'true') {
          val = true;
        }
        backState[key] = val;
      });

    if (backState.fontSize) {
      backState.fontSize = +backState.fontSize;
    }

    return backState;
  }

  private queryCommandValue(commandId: string) {
    return document.queryCommandValue(commandId);
  }

  private exec(commandId: any, value?: any) {
    return document.execCommand(commandId, true, value);
  }

  // --------------------------------------------------------------[ lifecycle ]

  componentDidLoad() {
    const ele = this.element || this._lastElement;
    if (ele) {
      this.elementChanged(ele);
      ele.innerHTML = this.value || '';
    }
  }

  render() {
    renderHiddenInput(true, this.el, this.name, this.value, this.disabled);
    const cls = {
      'inline-element': !this.element
    };
    return (
      <Host class={cls}>
        {this.showActionBar && (
          <aiao-text-editor-bar actionState={this._state} onAction={this.onAction}></aiao-text-editor-bar>
        )}
        {!this.element && <div class="element" ref={e => this.elementChanged(e)}></div>}
      </Host>
    );
  }
}

import { renderHiddenInput } from '@aiao/elements-cdk';
import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  Watch
} from '@stencil/core';

import { CodeEditorAcitons } from '../../utils/code-editor/actions';
import { getBaseMonacoUrl } from '../../utils/code-editor/base-url';
import { LoadMonacoEditor } from '../../utils/code-editor/load-monaco-editor';
import { normalizeMonacoEditorOptions } from '../../utils/code-editor/normalize-options';
import { normalizeMonacoEditorValue, normalizeMonacoEditorValueOut } from '../../utils/code-editor/normalize-value';

const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  theme: 'vs-dark',
  minimap: {
    enabled: false
  }
};

// 只加载一次
let loader: LoadMonacoEditor;

@Component({
  tag: 'aiao-code-editor',
  styleUrl: './code-editor.scss',
  scoped: true
})
export class CodeEditor implements ComponentInterface {
  @Element() el!: HTMLAiaoCodeEditorElement;
  private inputId = `aiao-code-editor:${codeEditorId++}`;

  private setModelTimer?: any;
  private editor?: monaco.editor.IStandaloneCodeEditor;

  // --------------------------------------------------------------[ State ]
  // --------------------------------------------------------------[ Event ]
  @Event() aiaoChange!: EventEmitter<any>;
  // --------------------------------------------------------------[ Prop ]

  /**
   * 默认路径 monaco 资源路径
   * @example 'https://cdn.jsdelivr.net/npm/monaco-editor@0.20.0/min'
   */
  @Prop() baseUrl?: string;
  /**
   * 禁用
   */
  @Prop() disabled = false;
  /**
   * 语言
   * @example javascript, json
   */
  @Prop() language?: string;
  /**
   * 显示语言，默认根据浏览器判断
   * @example  'de' | 'es' | 'fr' | 'it' | 'ja' | 'ko' | 'ru' | 'zh-cn' | 'zh-tw'
   */
  @Prop() localizeCode?: string;
  /**
   * form 名
   */
  @Prop() name: string = this.inputId;
  /**
   * 配置
   */
  @Prop() options?: monaco.editor.IEditorConstructionOptions;
  /**
   * monaco uri
   */
  @Prop() uri?: monaco.Uri;
  /**
   * 当前值
   */
  @Prop() value: string | any;

  // --------------------------------------------------------------[ Watch ]
  @Watch('language')
  @Watch('uri')
  setModel() {
    if (this.setModelTimer) {
      clearTimeout(this.setModelTimer);
    }
    this.setModelTimer = setTimeout(() => {
      const value = normalizeMonacoEditorValue(this.language, this.value);
      const model = monaco.editor.createModel(value, this.language, this.uri);
      this.getEditor().setModel(model);
    }, 0);
  }

  // --------------------------------------------------------------[ Listen ]
  @Listen('resize', {
    target: 'window'
  })
  resize() {
    this.getEditor().layout();
  }
  // --------------------------------------------------------------[ event hander ]
  // --------------------------------------------------------------[ public function ]
  /**
   * 格式化
   */
  @Method()
  async format() {
    return this.getEditor().getAction('editor.action.formatDocument').run();
  }

  /**
   * action
   */
  @Method()
  async action(action: CodeEditorAcitons) {
    switch (action) {
      case CodeEditorAcitons.format:
        return this.format();
      default:
        break;
    }
  }

  // --------------------------------------------------------------[ private function ]
  private getEditor() {
    if (!this.editor) {
      throw new Error('aiao-code-editor 还未初始化');
    }
    return this.editor;
  }
  private createMonaco(options: monaco.editor.IStandaloneEditorConstructionOptions = defaultOptions) {
    if (this.editor) {
      this.editor.dispose();
    }
    const val = normalizeMonacoEditorValue(this.value, this.language);
    options = normalizeMonacoEditorOptions(val, options, this.uri, this.language);
    this.editor = monaco.editor.create(this.el, options);
    this.editor.onDidChangeModelContent(() => {
      try {
        const value = normalizeMonacoEditorValueOut(this.editor?.getValue(), this.language);
        this.value = value;
        this.aiaoChange.emit({ value });
      } catch {
        //
      }
    });
  }

  // --------------------------------------------------------------[ lifecycle ]

  async componentDidLoad() {
    const baseUrl = getBaseMonacoUrl(this.baseUrl);
    if (!loader) {
      loader = new LoadMonacoEditor(baseUrl, this.localizeCode);
    }
    await loader.load();
    this.createMonaco(this.options);
  }

  render() {
    renderHiddenInput(true, this.el, this.name, this.value, this.disabled);
    return <Host></Host>;
  }
}
let codeEditorId = 0;

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

import { getBaseUrl } from '../../utils/code-editor/base-url';
import { LoadMonacoEditor } from '../../utils/code-editor/load-monaco-editor';
import { normalizeMonacoEditorValue, normalizeMonacoEditorValueOut } from '../../utils/code-editor/normalize-value';

const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  theme: 'vs-dark',
  minimap: {
    enabled: false
  }
};

// 只加载一次
let loader: any;

@Component({
  tag: 'aiao-code-diff-editor',
  styleUrl: './code-diff-editor.scss',
  scoped: true
})
export class CodeEditor implements ComponentInterface {
  @Element() el!: HTMLAiaoCodeEditorElement;

  private editor: monaco.editor.IStandaloneDiffEditor;

  // --------------------------------------------------------------[ State ]
  // --------------------------------------------------------------[ Event ]
  @Event() aiaoChange: EventEmitter<any>;
  // --------------------------------------------------------------[ Prop ]

  @Prop() name: string;
  @Prop() disabled: boolean;

  @Prop() options: monaco.editor.IEditorConstructionOptions;
  @Prop() value: string;
  @Prop() originalValue: string;

  @Prop() language: string;
  @Prop() uri: monaco.Uri;

  // 'https://cdn.bootcss.com/monaco-editor/0.18.0/min/';
  @Prop() baseUrl: string;

  // 'de' | 'es' | 'fr' | 'it' | 'ja' | 'ko' | 'ru' | 'zh-cn' | 'zh-tw'
  @Prop() localizeCode: string;

  // --------------------------------------------------------------[ Watch ]
  @Watch('language')
  @Watch('uri')
  setModel() {
    if (this.editor) {
      setTimeout(() => this.updateModel(), 0);
    }
  }
  // --------------------------------------------------------------[ Listen ]
  @Listen('resize', {
    target: 'window'
  })
  resize() {
    if (this.editor) {
      this.editor.layout();
    }
  }
  // --------------------------------------------------------------[ event hander ]
  // --------------------------------------------------------------[ public function ]

  @Method()
  async format() {
    return this.editor
      .getModifiedEditor()
      .getAction('editor.action.formatDocument')
      .run();
  }

  // --------------------------------------------------------------[ private function ]
  private updateModel() {
    const originalValue = normalizeMonacoEditorValue(this.language, this.originalValue);
    const modifiedValue = normalizeMonacoEditorValue(this.language, this.value);
    const originalModel = monaco.editor.createModel(originalValue, this.language, this.uri);
    const modifiedModel = monaco.editor.createModel(modifiedValue, this.language, this.uri);
    this.editor.setModel({
      original: originalModel,
      modified: modifiedModel
    });
    return { originalValue, modifiedValue, originalModel, modifiedModel };
  }

  private createMonaco(options: monaco.editor.IStandaloneEditorConstructionOptions = defaultOptions) {
    if (this.editor) {
      this.editor.dispose();
    }
    this.editor = monaco.editor.createDiffEditor(this.el, options);
    const { modifiedModel } = this.updateModel();
    modifiedModel.onDidChangeContent(() => {
      try {
        const value = normalizeMonacoEditorValueOut(this.language, modifiedModel.getValue());
        this.aiaoChange.emit({ value });
      } catch {
        //
      }
    });
  }

  // --------------------------------------------------------------[ lifecycle ]

  async componentDidLoad() {
    const baseUrl = getBaseUrl(this.baseUrl);
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

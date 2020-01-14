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
  Prop
} from '@stencil/core';

import { config } from '../../global/config';
import { LoadMonacoEditor } from '../../utils/code-editor/load-monaco-editor';
import { normalizeMonacoEditorValue, normalizeMonacoEditorValueOut } from '../../utils/code-editor/normalize-value';
import { normalizeMonacoEditorOptions } from '../../utils/code-editor/normalize-options';

const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  theme: 'vs-dark',
  minimap: {
    enabled: false
  }
};

// 只加载一次
let loader: any;

@Component({
  tag: 'aiao-code-editor',
  styleUrl: './code-editor.scss',
  scoped: true
})
export class CodeEditor implements ComponentInterface {
  @Element() el!: HTMLAiaoCodeEditorElement;

  private editor: monaco.editor.IStandaloneCodeEditor;

  // --------------------------------------------------------------[ State ]
  // --------------------------------------------------------------[ Event ]
  @Event() aiaoChange: EventEmitter<any>;
  // --------------------------------------------------------------[ Prop ]

  @Prop() name: string;
  @Prop() disabled: boolean;

  @Prop() options: monaco.editor.IEditorConstructionOptions;
  @Prop() value: string;
  @Prop() language: string;
  @Prop() uri: monaco.Uri;

  // 'https://cdn.bootcss.com/monaco-editor/0.18.0/min/';
  @Prop() baseUrl: string;

  // 'de' | 'es' | 'fr' | 'it' | 'ja' | 'ko' | 'ru' | 'zh-cn' | 'zh-tw'
  @Prop() localizeCode: string;

  // --------------------------------------------------------------[ Watch ]
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
    return this.editor.getAction('editor.action.formatDocument').run();
  }

  // --------------------------------------------------------------[ private function ]
  private createMonaco(options: monaco.editor.IStandaloneEditorConstructionOptions = defaultOptions) {
    if (this.editor) {
      this.editor.dispose();
    }

    const val = normalizeMonacoEditorValue(this.language, this.value);
    options = normalizeMonacoEditorOptions(options, this.uri, this.language, val);

    this.editor = monaco.editor.create(this.el, options);

    this.editor.onDidChangeModelContent(() => {
      try {
        const value = normalizeMonacoEditorValueOut(this.language, this.editor.getValue());
        this.aiaoChange.emit({ value });
      } catch {
        //
      }
    });
  }

  // --------------------------------------------------------------[ lifecycle ]

  async componentDidLoad() {
    const baseUrl =
      this.baseUrl || config.get('codeEditorBaseUrl') || 'https://cdn.jsdelivr.net/npm/monaco-editor@0.19.2/min';

    if (!loader) {
      loader = new LoadMonacoEditor(baseUrl, this.localizeCode);
    }
    await loader.load();
    this.createMonaco(this.options);
  }

  componentDidRender() {
    if (this.editor) {
      this.createMonaco(this.options);
    }
  }

  render() {
    renderHiddenInput(true, this.el, this.name, this.value, this.disabled);
    return <Host></Host>;
  }
}

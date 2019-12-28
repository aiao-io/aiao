import { renderHiddenInput } from '@aiao/elements-cdk';
import { urlJoin } from '@aiao/util';
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
import { LoadMonacoEditor } from './load-monaco-editor';

const defaultOptions: monaco.editor.IEditorConstructionOptions = {
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
  scoped: true,
  assetsDir: 'assets'
})
export class CodeEditor implements ComponentInterface {
  @Element() el!: HTMLAiaoCodeEditorElement;
  private resourcesUrl: string = config.get('resourcesUrl');

  private editor: monaco.editor.IStandaloneCodeEditor;

  // --------------------------------------------------------------[ State ]
  // --------------------------------------------------------------[ Event ]
  @Event() aiaoChange: EventEmitter<any>;
  @Event() aiaoInput: EventEmitter<any>;
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
  private createMonaco(options: monaco.editor.IEditorConstructionOptions = defaultOptions) {
    if (this.editor) {
      this.editor.dispose();
    }

    const hasModel = this.uri || this.value || this.language;
    if (hasModel) {
      const model = monaco.editor.getModel(this.uri || ('' as any));
      if (model) {
        options.model = model;
        options.model.setValue(this.value);
      } else {
        options.model = monaco.editor.createModel(this.value, this.language, this.uri);
      }
    }

    options.value = this.value;
    options.language = this.language;
    this.editor = monaco.editor.create(this.el, options);

    const updateValue = (action?: 'input') => {
      const value = this.editor.getValue();
      switch (action) {
        case 'input':
          this.aiaoInput.emit({ value });
          break;
        default:
          this.aiaoChange.emit({ value });
      }
    };
    this.editor.onDidChangeModelContent(() => updateValue('input'));
    this.editor.onDidBlurEditorWidget(() => updateValue());
  }

  // --------------------------------------------------------------[ lifecycle ]

  async componentDidLoad() {
    const baseUrl = this.baseUrl || config.get('codeEditorBaseUrl') || urlJoin(this.resourcesUrl, 'assets/monaco');
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

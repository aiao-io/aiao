import set from 'lodash/set';

import { plainObjectToFlattenPathObject } from '@aiao/util';
import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';

import { ELEMENTS_FORM_ITEM } from '../../utils/render/render.interface';

@Component({
  tag: 'aiao-elements-form',
  styleUrl: './elements-form.scss',
  shadow: true
})
export class ElementsFrom implements ComponentInterface {
  private _formInputElements: HTMLInputElement[];
  private _formElements: Element[];

  viewRef: HTMLAiaoElementsViewElement;

  @Element() el!: HTMLElement;
  form: HTMLFormElement;

  // --------------------------------------------------------------[ State ]
  // --------------------------------------------------------------[ Event ]
  @Event() aiaoChange: EventEmitter<any>;
  @Event() aiaoInput: EventEmitter<any>;

  // --------------------------------------------------------------[ Prop ]

  @Prop() html: string;

  /**
   * schema
   */
  @Prop() schema: any;

  /**
   * elements value
   */
  @Prop() value: any;

  // --------------------------------------------------------------[ Watch ]

  // --------------------------------------------------------------[ Listen ]

  // --------------------------------------------------------------[ event hander ]
  // --------------------------------------------------------------[ public function ]

  /**
   * 获取 form 的值
   */
  @Method()
  async values() {
    const values = this.getValues();
    return values;
  }

  /**
   * 得到 form 的值(路径模式)
   */
  @Method()
  async flattenPathValues() {
    return this.getFlattenPathValues();
  }

  private getInputElementByPath(path: string) {
    const pathElement: any = this.formElements.find((ele: any) => ele.name === path);
    if (!pathElement) {
      throw new Error(`${path} 没找到`);
    }
    return pathElement;
  }

  /**
   * 获取 form 值
   */
  @Method()
  async getValue(path: string) {
    const pathElement: any = this.getInputElementByPath(path);
    return pathElement.value || pathElement.checked;
  }

  /**
   * 设置 form 的值
   */
  @Method()
  async setValue(path: string, value: any, emit = true) {
    const pathElement: any = this.getInputElementByPath(path);
    pathElement.value = value;
    if (emit) {
      this.valueChanged();
    }
  }

  /**
   * 设置 form 的值
   */
  @Method()
  async setValues(values: any, emit = true) {
    const vals = plainObjectToFlattenPathObject(values);
    const all = Object.keys(vals).map(path => this.setValue(path, vals[path], false));
    await Promise.all(all);
    if (emit) {
      this.valueChanged();
    }
  }

  @Method()
  async reset() {
    //
  }

  @Method()
  async markAsPristine() {
    //
  }

  @Method()
  async markAsDirty() {
    //
  }

  // --------------------------------------------------------------[ private function ]
  private getFlattenPathValues() {
    const value: any = {};
    this.formElements.forEach((ele: any) => {
      value[ele.name] = ele.value || ele.checked;
    });
    return value;
  }

  private getValues() {
    const values: any = {};
    const pathValues = this.getFlattenPathValues();
    Object.keys(pathValues).forEach(path => set(values, path, pathValues[path]));
    return values;
  }
  private get formInputElements() {
    if (!this._formInputElements) {
      this._formInputElements = Array.from(this.form.elements).filter(
        (d: any) => d && d.name && d.name !== 'undefined'
      ) as HTMLInputElement[];
    }
    return this._formInputElements;
  }

  private get formElements() {
    if (!this._formElements) {
      this._formElements = Array.from(this.viewRef.querySelectorAll(`.${ELEMENTS_FORM_ITEM}`));
    }
    return this._formElements;
  }

  valueChanged = (type: 'input' | 'change' | 'all' = 'all', value = this.getValues()) => {
    switch (type) {
      case 'input':
        this.aiaoInput.emit({ value });
        break;
      case 'change':
        this.aiaoChange.emit({ value });
        break;
      default:
        this.aiaoInput.emit({ value });
        this.aiaoChange.emit({ value });
        break;
    }
  };

  // --------------------------------------------------------------[ lifecycle ]

  componentWillRender() {
    this._formElements = this._formInputElements = undefined;
  }

  componentDidLoad() {
    if (this.value) {
      this.setValues(this.value, false);
    }
    const formInputElements = this.formInputElements;
    formInputElements.forEach((d: HTMLInputElement) => {
      d.onchange = () => this.valueChanged('change');
      d.oninput = () => this.valueChanged('input');
    });
  }

  render() {
    return (
      <Host>
        <form ref={ref => (this.form = ref)}>
          <aiao-elements-view html={this.html} ref={ref => (this.viewRef = ref)}></aiao-elements-view>
        </form>
      </Host>
    );
  }
}

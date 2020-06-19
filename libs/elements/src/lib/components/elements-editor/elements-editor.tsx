import { IElementConfig, IElementData, renderHiddenInput } from '@aiao/elements-cdk';
import { Component, ComponentInterface, Element, Host, Prop } from '@stencil/core';

import { IElementEditorData } from '../../interfaces/elements-editor.interface';
import { elementDataToEditData } from '../../utils/render/element-data-util';
import { elementsPreviewHtmlRender } from '../../utils/render/render';
import { EditMode } from '../../utils/render/render.interface';

@Component({
  tag: 'aiao-elements-editor',
  styleUrl: './elements-editor.scss',
  shadow: true
})
export class ElementsEditor implements ComponentInterface {
  @Element() el!: HTMLElement;

  // --------------------------------------------------------------[ State ]
  // --------------------------------------------------------------[ Event ]
  // --------------------------------------------------------------[ Prop ]
  /**
   * 配置
   */
  @Prop() config: IElementConfig[];
  /**
   * 禁用
   */
  @Prop() disabled: boolean;
  /**
   * 编辑模式
   */
  @Prop() editMode: EditMode = 'edit';
  /**
   * form 名
   */
  @Prop() name: string;
  /**
   * 值
   */
  @Prop() value: IElementData[];

  /**
   * 显示视图
   */
  @Prop() view: HTMLElement;
  // --------------------------------------------------------------[ Watch ]
  // --------------------------------------------------------------[ Listen ]
  // --------------------------------------------------------------[ event hander ]
  // --------------------------------------------------------------[ public function ]
  // --------------------------------------------------------------[ private function ]
  // --------------------------------------------------------------[ lifecycle ]

  render() {
    let data: IElementEditorData[];
    let needValue = '';
    if (this.value) {
      if (this.view) {
        this.view.innerHTML = elementsPreviewHtmlRender(this.config, this.value, { editMode: this.editMode });
      } else {
        data = elementDataToEditData(this.value);
      }
      try {
        needValue = JSON.stringify(data);
      } catch {
        //
      }
    }

    renderHiddenInput(true, this.el, this.name, needValue, this.disabled);
    return (
      <Host>{!this.view && <aiao-elements-preview config={this.config} value={data}></aiao-elements-preview>}</Host>
    );
  }
}

import { IElementConfig, IElementData } from '@aiao/elements-cdk';
import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core';

import { elementsPreviewHtmlRender } from '../../utils/render/render';
import { EditMode } from '../../utils/render/render.interface';

@Component({
  tag: 'aiao-elements-editor',
  styleUrl: './elements-editor.scss',
  shadow: true
})
export class ElementsEditor implements ComponentInterface {
  @Element() el!: HTMLElement;

  /**
   * elements 配置
   */
  @Prop() config: IElementConfig[];

  /**
   * elements 数据
   */
  @Prop() value: IElementData[];

  /**
   * elements 编辑模式
   */
  @Prop() editMode: EditMode = 'edit';

  /**
   * 视图元素
   */
  @Prop() view: HTMLElement;

  render() {
    if (this.view) {
      this.view.innerHTML = elementsPreviewHtmlRender(this.config, this.value, { editMode: this.editMode });
    }
    return (
      <Host>
        {!this.view && (
          <aiao-elements-editor-preview config={this.config} value={this.value}></aiao-elements-editor-preview>
        )}
      </Host>
    );
  }
}

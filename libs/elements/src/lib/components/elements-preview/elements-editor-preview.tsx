import { IElementConfig } from '@aiao/elements-cdk';
import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core';

import { elementsPreviewRender } from '../../utils/render/render';
import { EditMode } from '../../utils/render/render.interface';
import { IElementEditorData } from '../../interfaces/elements-editor.interface';

@Component({
  tag: 'aiao-elements-editor-preview',
  styleUrl: './elements-editor-preview.scss',
  shadow: false
})
export class ElementsEditorPreview implements ComponentInterface {
  @Element() el!: HTMLElement;

  private nodes: IElementEditorData[];

  /**
   * elements 配置
   */
  @Prop() config: IElementConfig[];

  /**
   * elements 数据
   */
  @Prop() value: IElementEditorData[];

  /**
   * elements 编辑模式
   */
  @Prop() editMode: EditMode = 'edit';

  buildNodes() {
    this.nodes = elementsPreviewRender(this.config, this.value, { editMode: this.editMode });
    const needNodes = this.nodes.filter(d => d._parentId === undefined);
    return needNodes.map(d => this.renderElement(d));
  }

  private renderElement(data: IElementEditorData) {
    const { tag: TagName, slot, attributes, style, class: cls, innerText, innerHTML, _id } = data;
    let children = [];
    if (_id) {
      children = this.nodes.filter(n => n._parentId === _id);
    }
    return (
      <TagName slot={slot} {...attributes} style={style} class={cls} innerHTML={innerHTML}>
        {innerText}
        {children.map(c => this.renderElement(c))}
      </TagName>
    );
  }

  render() {
    return <Host>{this.buildNodes()}</Host>;
  }
}

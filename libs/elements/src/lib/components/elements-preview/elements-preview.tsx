import { IElementConfig } from '@aiao/elements-cdk';
import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core';

import { IElementEditorData } from '../../interfaces/elements-editor.interface';
import { elementsPreviewRender } from '../../utils/render/render';
import { EditMode } from '../../utils/render/render.interface';

@Component({
  tag: 'aiao-elements-preview',
  styleUrl: './elements-preview.scss',
  shadow: true
})
export class ElementsEditorPreview implements ComponentInterface {
  @Element() el!: HTMLElement;

  private nodes?: IElementEditorData[];

  // --------------------------------------------------------------[ State ]
  // --------------------------------------------------------------[ Event ]
  // --------------------------------------------------------------[ Prop ]

  /**
   *  配置
   */
  @Prop() config?: IElementConfig[];

  /**
   *  数据
   */
  @Prop() value?: IElementEditorData[];

  /**
   *  编辑模式
   */
  @Prop() editMode: EditMode = 'edit';

  // --------------------------------------------------------------[ Watch ]
  // --------------------------------------------------------------[ Listen ]
  // --------------------------------------------------------------[ event hander ]
  // --------------------------------------------------------------[ public function ]
  // --------------------------------------------------------------[ private function ]
  private buildNodes() {
    this.nodes = elementsPreviewRender(this.config, this.value, { editMode: this.editMode });
    const needNodes = this.nodes.filter(d => d._parentId === undefined);
    return needNodes.map(d => this.renderElement(d));
  }

  private renderElement(data: IElementEditorData) {
    const { tag: TagName, slot, attributes, events, style, class: cls, innerText, innerHTML, _id } = data;
    let children: IElementEditorData[] = [];
    if (_id) {
      children = this.nodes!.filter(n => n._parentId === _id);
    }
    return (
      <TagName id={_id} slot={slot} {...attributes} style={style} class={cls} {...events} innerHTML={innerHTML}>
        {innerText}
        {children.map(c => this.renderElement(c))}
      </TagName>
    );
  }

  // --------------------------------------------------------------[ lifecycle ]
  render() {
    return <Host>{this.buildNodes()}</Host>;
  }
}

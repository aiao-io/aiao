import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'aiao-elements-view',
  styleUrl: './elements-view.scss',
  shadow: true
})
export class ElementsView implements ComponentInterface {
  @Element() el!: HTMLAiaoElementsViewElement;

  @Prop() html: string;

  render() {
    this.el.shadowRoot.innerHTML = this.html || '';
    return <Host></Host>;
  }
}

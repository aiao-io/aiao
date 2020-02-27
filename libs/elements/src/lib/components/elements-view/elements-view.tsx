import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'aiao-elements-view',
  styleUrl: './elements-view.scss',
  shadow: false,
  scoped: true
})
export class ElementsView implements ComponentInterface {
  @Element() el!: HTMLAiaoElementsViewElement;

  @Prop() html: string;

  render() {
    this.el.innerHTML = this.html || '';
    return <Host></Host>;
  }
}

import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core';

import { config } from '../../global/config';

@Component({
  tag: 'aiao-elements-view',
  styleUrl: './elements-view.scss',
  shadow: true
})
export class ElementsView implements ComponentInterface {
  @Element() el!: HTMLAiaoElementsViewElement;

  private domSanitizer = config.get('domSanitizer');

  // --------------------------------------------------------------[ State ]
  // --------------------------------------------------------------[ Event ]
  // --------------------------------------------------------------[ Prop ]

  /**
   * html
   */
  @Prop() html?: string;
  /**
   * css
   */
  @Prop() css?: string;
  /**
   * js
   */
  @Prop() js?: string;
  // --------------------------------------------------------------[ Watch ]
  // --------------------------------------------------------------[ Listen ]
  // --------------------------------------------------------------[ event hander ]
  // --------------------------------------------------------------[ public function ]
  // --------------------------------------------------------------[ private function ]
  // --------------------------------------------------------------[ lifecycle ]
  render() {
    let { html, css, js } = this;
    if (this.domSanitizer) {
      if (html) {
        html = this.domSanitizer.bypassSecurityTrustHtml(html);
      }
      if (css) {
        css = this.domSanitizer.bypassSecurityTrustStyle(css);
      }
      if (js) {
        js = this.domSanitizer.bypassSecurityTrustScript(js);
      }
    }
    return (
      <Host>
        {css && <style>{css}</style>}
        {js && <script>{js}</script>}
        <div innerHTML={html}></div>
      </Host>
    );
  }
}

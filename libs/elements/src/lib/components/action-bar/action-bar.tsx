import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'aiao-action-bar',
  styleUrl: 'action-bar.scss',
  shadow: true
})
export class Action {
  // --------------------------------------------------------------[ State ]
  // --------------------------------------------------------------[ Event ]
  // --------------------------------------------------------------[ Prop ]

  @Prop() disabled = false;

  // --------------------------------------------------------------[ Watch ]
  // --------------------------------------------------------------[ Listen ]
  // --------------------------------------------------------------[ event hander ]
  // --------------------------------------------------------------[ public function ]
  // --------------------------------------------------------------[ private function ]
  // --------------------------------------------------------------[ lifecycle ]
  render() {
    return (
      <Host>
        <div class="action-bar-background"></div>
        <div class="action-bar-container">
          <slot name="start"></slot>
          <slot name="secondary"></slot>
          <div class="action-bar-content">
            <slot></slot>
          </div>
          <slot name="primary"></slot>
          <slot name="end"></slot>
        </div>
      </Host>
    );
  }
}

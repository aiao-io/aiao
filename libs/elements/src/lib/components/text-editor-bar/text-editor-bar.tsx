import { urlJoin } from '@aiao/url';
import { Component, Element, Event, EventEmitter, Host, Prop } from '@stencil/core';

import { config } from '../../global/config';
import { TEXT_EDITOR_DEFAULT_SETTINGS } from './default-actions';
import { TextActionState, TextEditorBarOptions } from './text-editor-bar.interface';

@Component({
  tag: 'aiao-text-editor-bar',
  styleUrl: 'text-editor-bar.scss',
  assetsDir: 'assets/text-editor-bar',
  shadow: true
})
export class TextEditorBar {
  @Element() el!: HTMLElement;
  private resourcesUrl = config.get('resourcesUrl');

  // --------------------------------------------------------------[ State ]
  // --------------------------------------------------------------[ Event ]
  /**
   * 发送 action
   */
  @Event() action: EventEmitter<any>;

  // --------------------------------------------------------------[ Prop ]

  /**
   * action 的状态
   */
  @Prop() actionState: TextActionState;

  /**
   * 配置
   */
  @Prop() options: TextEditorBarOptions[];
  // --------------------------------------------------------------[ Watch ]
  // --------------------------------------------------------------[ Listen ]
  // --------------------------------------------------------------[ event hander ]
  // --------------------------------------------------------------[ public function ]
  // --------------------------------------------------------------[ private function ]
  // --------------------------------------------------------------[ lifecycle ]
  render() {
    return (
      <Host class="action-bar">
        {(this.options || TEXT_EDITOR_DEFAULT_SETTINGS).map(({ action, iconName, iconSrc, title, value }) => {
          let needIconSrc: string;
          let needIconName: string;
          if (iconSrc) {
            needIconSrc = iconSrc.startsWith('http') ? iconSrc : urlJoin(this.resourcesUrl, iconSrc);
          } else if (iconName) {
            needIconName = iconName;
          }

          let selected = this.actionState && this.actionState[action];
          selected = selected !== undefined && selected !== false;
          if (selected && value) {
            selected = value === this.actionState[action];
          }
          const cls = {
            'action-button': true,
            selected
          };

          return (
            <button class={cls} onClick={() => this.action.emit({ action, value })}>
              {needIconSrc || needIconName ? <ion-icon title={title} src={needIconSrc} name={needIconName} /> : title}
            </button>
          );
        })}
      </Host>
    );
  }
}

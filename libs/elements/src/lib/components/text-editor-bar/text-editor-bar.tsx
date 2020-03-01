import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

import { config } from '../../global/config';
import { TextActionState, TextEditorAcitons } from '../../interfaces/text-editor.interface';

@Component({
  tag: 'aiao-text-editor-bar',
  styleUrl: 'text-editor-bar.scss',
  assetsDir: 'text-editor',
  shadow: true
})
export class TextEditorBar {
  // private options = ['1', '2', '3', '4', '5', '6', '7'];
  private resourcesUrl: string = config.get('resourcesUrl');

  private defaultSettings = [
    {
      action: TextEditorAcitons.bold,
      icon: 'bold.svg',
      title: 'Bold'
    },
    {
      action: TextEditorAcitons.italic,
      icon: 'italic.svg',
      title: 'italic'
    },
    {
      action: TextEditorAcitons.underline,
      icon: 'underline.svg',
      title: 'underline'
    },
    {
      action: TextEditorAcitons.strikeThrough,
      icon: 'strikeThrough.svg',
      title: 'strikeThrough'
    },
    {
      action: TextEditorAcitons.heading,
      icon: 'h1.svg',
      title: 'h1',
      value: 1
    },
    {
      action: TextEditorAcitons.heading,
      icon: 'h2.svg',
      title: 'h2',
      value: 2
    },
    {
      action: TextEditorAcitons.heading,
      icon: 'h3.svg',
      title: 'h3',
      value: 3
    },
    {
      action: TextEditorAcitons.paragraph,
      icon: 'paragraph.svg',
      title: 'paragraph'
    },
    {
      action: TextEditorAcitons.insertOrderedList,
      icon: 'list-ol.svg',
      title: 'list-ol'
    },
    {
      action: TextEditorAcitons.insertUnorderedList,
      icon: 'list-ul.svg',
      title: 'list-ul'
    },
    {
      action: TextEditorAcitons.quote,
      icon: 'quote.svg',
      title: 'quote'
    },
    {
      action: TextEditorAcitons.indent,
      icon: 'indent.svg',
      title: 'indent'
    },
    {
      action: TextEditorAcitons.outdent,
      icon: 'outdent.svg',
      title: 'outdent'
    },
    {
      action: TextEditorAcitons.justifyLeft,
      icon: 'align-left.svg',
      title: 'align-left'
    },
    {
      action: TextEditorAcitons.justifyCenter,
      icon: 'align-center.svg',
      title: 'align-center'
    },
    {
      action: TextEditorAcitons.justifyRight,
      icon: 'align-right.svg',
      title: 'align-right'
    },
    {
      action: TextEditorAcitons.justifyFull,
      icon: 'align-justify.svg',
      title: 'align-justify'
    },
    {
      action: TextEditorAcitons.undo,
      icon: 'undo.svg',
      title: 'undo'
    },
    {
      action: TextEditorAcitons.redo,
      icon: 'redo.svg',
      title: 'redo'
    }
  ];

  @Event() action: EventEmitter<any>;

  @Prop() actions = this.defaultSettings;

  @Prop() actionState: TextActionState;
  render() {
    return (
      <Host class="action-bar">
        {this.actions.map(({ action, icon, title, value }) => {
          const src = `${this.resourcesUrl}/text-editor/${icon}`;
          const selected = this.actionState && this.actionState[action];
          const cls = {
            'action-button': true,
            selected: selected !== undefined && selected !== false
          };

          return (
            <button class={cls} onClick={() => this.action.emit({ action, value })}>
              {icon ? <ion-icon title={title} src={src} /> : title}
            </button>
          );
        })}
      </Host>
    );
  }
}

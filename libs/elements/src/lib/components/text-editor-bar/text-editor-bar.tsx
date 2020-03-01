import { Component, h, Host, Prop, EventEmitter, Event } from '@stencil/core';

import { config } from '../../global/config';
import { TextEditorAcitons } from '../../interfaces/text-editor.interface';

@Component({
  tag: 'text-editor-bar',
  styleUrl: 'text-editor-bar.scss',
  assetsDir: 'text-editor',
  shadow: true
})
export class TextEditorBar {
  // private options = ['1', '2', '3', '4', '5', '6', '7'];
  private resourcesUrl: string = config.get('resourcesUrl');

  private defaultSettings = [
    {
      action: TextEditorAcitons.Bold,
      icon: 'bold.svg',
      title: 'Bold'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'italic.svg',
      title: 'italic'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'underline.svg',
      title: 'underline'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'strikeThrough.svg',
      title: 'strikeThrough'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'h1.svg',
      title: 'h1'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'h2.svg',
      title: 'h2'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'h3.svg',
      title: 'h3'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'paragraph.svg',
      title: 'paragraph'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'list-ol.svg',
      title: 'list-ol'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'list-ul.svg',
      title: 'list-ul'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'quote.svg',
      title: 'quote'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'indent.svg',
      title: 'indent'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'outdent.svg',
      title: 'outdent'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'align-left.svg',
      title: 'align-left'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'align-center.svg',
      title: 'align-center'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'align-right.svg',
      title: 'align-right'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'align-justify.svg',
      title: 'align-justify'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'undo.svg',
      title: 'undo'
    },
    {
      action: TextEditorAcitons.Italic,
      icon: 'redo.svg',
      title: 'redo'
    }
  ];

  @Event() action: EventEmitter<any>;

  @Prop() actions = this.defaultSettings;

  render() {
    return (
      <Host class="action-bar">
        {this.actions.map(({ action, icon, title }) => {
          const src = `${this.resourcesUrl}/text-editor/${icon}`;
          return (
            <button class="action-button" onClick={() => this.action.emit({ detail: action })}>
              {icon ? <ion-icon title={title} src={src} /> : title}
            </button>
          );
        })}
      </Host>
    );
  }
}

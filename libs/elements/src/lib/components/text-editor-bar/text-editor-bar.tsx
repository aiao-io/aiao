import { Component, h, Prop } from '@stencil/core';

import { config } from '../../global/config';
import { TextEditorAcitons } from '../../interfaces/text-editor.interface';

@Component({
  tag: 'text-editor-bar',
  styleUrl: 'text-editor-bar.scss',
  assetsDir: 'text-editor',
  shadow: true
})
export class TextEditorBar {
  private options = ['1', '2', '3', '4', '5', '6', '7'];
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
      title: 'line'
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
      icon: 'unlink.svg',
      title: 'unlink'
    }
  ];

  @Prop() actions = this.defaultSettings;

  render() {
    return (
      <div class="action-bar">
        {this.actions.map(({ icon, title }) => {
          const src = `${this.resourcesUrl}/text-editor/${icon}`;
          return <button class="action-button">{icon ? <ion-icon title={title} src={src} /> : title}</button>;
        })}
      </div>
    );
  }
}

/*
<div class="action-bar">
        <ion-button fill={bold ? 'solid' : 'clear'} onClick={() => this.bold()}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/bold.svg`} />
        </ion-button>
        <ion-button fill={italic ? 'solid' : 'clear'} onClick={() => this.italic()}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/italic.svg`} />
        </ion-button>
        <ion-button fill={underline ? 'solid' : 'clear'} onClick={() => this.underline()}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/underline.svg`} />
        </ion-button>
        <ion-button fill={strikeThrough ? 'solid' : 'clear'} onClick={() => this.strikethrough()}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/strikeThrough.svg`} />
        </ion-button>
        <ion-button fill={h1 ? 'solid' : 'clear'} onClick={() => this.heading(1)}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/h1.svg`} />
        </ion-button>
        <ion-button fill={h2 ? 'solid' : 'clear'} onClick={() => this.heading(2)}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/h2.svg`} />
        </ion-button>
        <ion-button fill={h3 ? 'solid' : 'clear'} onClick={() => this.heading(3)}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/h3.svg`} />
        </ion-button>
        <ion-button fill="clear" onClick={() => this.paragraph()}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/paragraph.svg`} />
        </ion-button>
        <ion-button fill="clear" onClick={() => this.olist()}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/list-ol.svg`} />
        </ion-button>
        <ion-button fill="clear" onClick={() => this.ulist()}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/list-ul.svg`} />
        </ion-button>
        <ion-button fill={blockquote ? 'solid' : 'clear'} onClick={() => this.quote()}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/quote.svg`} />
        </ion-button>
        <ion-button fill="clear" onClick={() => this.line()}>
          <ion-icon name="return-down-back-outline"></ion-icon>
        </ion-button>
        <select onChange={e => this.fontSizeChange(e)}>
          {this.options.map(option => (
            <option value={option} selected={fontSize === option}>
              {option}
            </option>
          ))}
        </select>
        <mlab-color
          value={foreColor}
          onMlabOpen={() => this._saveSelection()}
          onMlabChange={(ev: any) => this.foreColorChanged(ev)}
        >
          文字
        </mlab-color>
        <ion-button fill="clear" onClick={() => this.indent()}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/indent.svg`} />
        </ion-button>
        <ion-button fill="clear" onClick={() => this.outdent()}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/outdent.svg`} />
        </ion-button>
        <ion-button fill={alginLeft ? 'solid' : 'clear'} onClick={() => this.alginLeft()}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/align-left.svg`} />
        </ion-button>
        <ion-button fill={alginCenter ? 'solid' : 'clear'} onClick={() => this.alginCenter()}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/align-center.svg`} />
        </ion-button>
        <ion-button fill={alginRight ? 'solid' : 'clear'} onClick={() => this.alginRight()}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/align-right.svg`} />
        </ion-button>
        <ion-button fill={alginFull ? 'solid' : 'clear'} onClick={() => this.alginFull()}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/align-justify.svg`} />
        </ion-button>
        <ion-button fill="clear" onClick={() => this.undo()}>
          <ion-icon slot="icon-only" name="arrow-undo-outline"></ion-icon>
        </ion-button>
        <ion-button fill="clear" onClick={() => this.redo()}>
          <ion-icon slot="icon-only" name="arrow-redo-outline" />
        </ion-button>
        <ion-button fill="clear" onClick={() => this.unlink()}>
          <ion-icon slot="icon-only" src={`${this.resourcesUrl}/assets/text-editor/unlink.svg`} />
        </ion-button>
      </div>
*/

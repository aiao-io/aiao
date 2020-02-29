import { Component, h } from '@stencil/core';

import { config } from '../../global/config';

@Component({
  tag: 'text-editor-bar',
  styleUrl: 'text-editor-bar.css',
  assetsDir: 'assets/text-editor',
  shadow: true
})
export class TextEditorBar {
  private options = ['1', '2', '3', '4', '5', '6', '7'];
  private resourcesUrl: string = config.get('resourcesUrl');

  render() {
    return (
      <button>
        <img src={`${this.resourcesUrl}/assets/text-editor/bold.svg`}>html</img>
      </button>
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

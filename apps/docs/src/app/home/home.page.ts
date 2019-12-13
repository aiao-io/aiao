import { MarkdownService } from 'ngx-markdown';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aiao-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  md = require('raw-loader!dist/apps/docs/docs/README.md');
  // mdEn = require('raw-loader!dist/apps/docs/docs/README.en.md');

  constructor(private markdownService: MarkdownService) {}

  async ngOnInit() {
    this.initMarkdown();
    // console.log('md --->', this.md);
  }

  private initMarkdown() {
    this.markdownService.renderer.heading = (text: string, level: number) => {
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return (
        '<h' +
        level +
        '>' +
        '<a name="' +
        escapedText +
        '" class="anchor" href="#' +
        escapedText +
        '">' +
        '<span class="header-link"></span>' +
        '</a>' +
        text +
        '</h' +
        level +
        '>'
      );
    };
  }
}

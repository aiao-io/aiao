import { LazyElementLoader } from '@aiao/lazy-element';
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  html1 = '';
  html2 = '';
  html3: SafeHtml = '';

  constructor(private dom: DomSanitizer, protected readonly elementsLoader: LazyElementLoader) {}

  load1() {
    this.html1 = `
                  <h1>load 1</h1>
                  <app-custom-element name="component"></app-custom-element>
  `;
  }

  load2() {
    this.html2 = `
                  <h1>load 2</h1>
                  <app-custom-element name="directive"></app-custom-element>
  `;
  }

  async load3() {
    const html = `
                  <h1>load 3</h1>
                  <app-custom-element name="LazyElementLoader"></app-custom-element>
`;
    await this.elementsLoader.loadFromHtmlString(html);
    this.html3 = this.dom.bypassSecurityTrustHtml(html);
  }

  async ready() {
    console.log('ready');
  }
}

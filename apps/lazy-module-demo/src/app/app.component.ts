import { LazyModuleLoader } from '@aiao/lazy-module';
import { Component } from '@angular/core';

@Component({
  selector: 'aiao-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lazy-module-demo';

  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  async preload() {
    await this.lazyModuleLoader.load('testModule');
    console.log('preload');
  }
}

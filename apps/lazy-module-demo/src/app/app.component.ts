import { Component } from '@angular/core';
import { LazyModuleLoader } from '@aiao/lazy-module';

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

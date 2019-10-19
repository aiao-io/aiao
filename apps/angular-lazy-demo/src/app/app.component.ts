import { Component } from '@angular/core';
import { LazyModuleLoader } from '@aiao/lazy-module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private lazyModuleLoader: LazyModuleLoader) {}
  async preloadLazyModule() {
    // tslint:disable-next-line: no-console
    console.time('preload lazy-module');
    await this.lazyModuleLoader.load('lazy-module');
    // tslint:disable-next-line: no-console
    console.timeEnd('preload lazy-module');
  }
}

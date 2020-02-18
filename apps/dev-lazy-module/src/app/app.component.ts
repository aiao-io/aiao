import { LazyModuleLoader } from '@aiao/lazy-module';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  async preload() {
    await this.lazyModuleLoader.load('testModule');
    console.log('preload');
  }
}

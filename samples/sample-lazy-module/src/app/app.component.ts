import { Component } from '@angular/core';
import { LazyModuleLoader } from '@aiao/lazy-module';
import { LazyComponentLoader } from '@aiao/lazy-component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'jimmy';
  html = `123`;

  constructor(
    private lazyModuleLoader: LazyModuleLoader,
    private lazyComponentLoader: LazyComponentLoader,
    private dialog: MatDialog
  ) {
    setInterval(() => {
      this.name = `${Math.random()}`;
      this.html = `<app-lazy-angular-element name="${Math.random()}"></app-lazy-angular-element>`;
    }, 100);
  }
  async preloadLazyModule() {
    // tslint:disable-next-line: no-console
    console.time('preload lazy-module');
    await this.lazyModuleLoader.load('lazy-module-demo');
    // tslint:disable-next-line: no-console
    console.timeEnd('preload lazy-module');
  }

  async openDialog() {
    const component = await this.lazyComponentLoader.load('lazy-component-demo', 'app-lazy-dialog');
    const dialogRef = this.dialog.open(component, {
      data: { name: 'Jimmy' }
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  nameChange() {
    this.name += '+';
    console.log('nameChange', this.name);
  }
}

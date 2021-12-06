import { LazyComponentLoader } from '@aiao/lazy-component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { HomeDialogComponent } from './home/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public lazyComponentLoader: LazyComponentLoader, public dialog: MatDialog) {}

  openDialogDirectly() {
    this.dialog.open(HomeDialogComponent);
  }

  async openDialog() {
    this.dialog.open(await this.lazyComponentLoader.load('homeModule', 'app-home-dialog'));
  }

  async openAloneDialog() {
    this.dialog.open(await this.lazyComponentLoader.load('AloneDialogModule', 'app-alone-dialog'));
  }
}

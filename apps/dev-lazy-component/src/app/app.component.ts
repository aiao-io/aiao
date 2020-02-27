import { LazyComponentLoader } from '@aiao/lazy-component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from './home/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public lazyComponentLoader: LazyComponentLoader, public dialog: MatDialog) {}

  async openDialog() {
    this.dialog.open(await this.lazyComponentLoader.load('homeModule', 'app-dialog'));
  }

  openDialogDirectly() {
    this.dialog.open(DialogComponent);
  }
}

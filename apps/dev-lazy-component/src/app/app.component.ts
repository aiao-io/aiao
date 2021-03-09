import { LazyComponentLoader } from '@aiao/lazy-component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public lazyComponentLoader: LazyComponentLoader, public dialog: MatDialog) {}

  async openDialog() {
    this.dialog.open(await this.lazyComponentLoader.load('DialogModule', 'app-dialog'));
  }
}

import { LazyComponentLoader } from '@aiao/lazy-component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { HomeDialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog, public lazyComponentLoader: LazyComponentLoader) {}

  ngOnInit() {}

  openSelfDialog() {
    this.dialog.open(HomeDialogComponent);
  }

  async openAloneDialog() {
    this.dialog.open(await this.lazyComponentLoader.load('AloneDialogModule', 'app-alone-dialog'));
  }
}

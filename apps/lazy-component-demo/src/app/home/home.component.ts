import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'aiao-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openSelfDialog() {
    this.dialog.open(DialogComponent);
  }
}

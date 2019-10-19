import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-lazy-dialog',
  templateUrl: './lazy-dialog.component.html',
  styleUrls: ['./lazy-dialog.component.scss']
})
export class LazyDialogComponent implements OnInit {
  @Input() name: string;

  constructor(public dialogRef: MatDialogRef<LazyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  close() {
    this.dialogRef.close();
  }
  ngOnInit() {}
}

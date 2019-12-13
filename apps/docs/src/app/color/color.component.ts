import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aiao-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  mdCn = require('raw-loader!dist/apps/docs/docs/libs/color/README.md');

  constructor() {}

  ngOnInit() {}
}

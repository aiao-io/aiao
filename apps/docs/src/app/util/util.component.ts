import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aiao-util',
  templateUrl: './util.component.html',
  styleUrls: ['./util.component.scss']
})
export class UtilComponent implements OnInit {
  mdCn = require('raw-loader!dist/apps/docs/docs/libs/util/README.md');
  constructor() {}

  ngOnInit() {}
}

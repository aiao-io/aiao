import { Component, OnInit } from '@angular/core';

import { UtilMdCn, UtilMdEn } from '../markdown/markdown';

@Component({
  selector: 'aiao-util',
  templateUrl: './util.component.html',
  styleUrls: ['./util.component.scss']
})
export class UtilComponent implements OnInit {
  mdCn = UtilMdCn;
  mdEn = UtilMdEn;
  constructor() {}

  ngOnInit() {}
}

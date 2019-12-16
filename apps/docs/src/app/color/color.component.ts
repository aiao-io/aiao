import { Component, OnInit } from '@angular/core';

import { ColorMdCn, ColorMdEn } from '../markdown/markdown';

@Component({
  selector: 'aiao-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  mdCn = ColorMdCn;
  mdEn = ColorMdEn;

  constructor() {}

  ngOnInit() {}
}

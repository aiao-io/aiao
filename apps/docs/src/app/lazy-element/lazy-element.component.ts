import { Component, OnInit } from '@angular/core';

import { LazyElementMdCn, LazyElementMdEn } from '../markdown/markdown';

@Component({
  selector: 'aiao-lazy-element',
  templateUrl: './lazy-element.component.html',
  styleUrls: ['./lazy-element.component.scss']
})
export class LazyElementComponent implements OnInit {
  mdCn = LazyElementMdCn;
  mdEn = LazyElementMdEn;

  constructor() {}

  ngOnInit() {}
}

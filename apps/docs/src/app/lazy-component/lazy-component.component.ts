import { Component, OnInit } from '@angular/core';

import { LazyComponentMdCn, LazyComponentMdEn } from '../markdown/markdown';

@Component({
  selector: 'aiao-lazy-component',
  templateUrl: './lazy-component.component.html',
  styleUrls: ['./lazy-component.component.scss']
})
export class LazyComponentComponent implements OnInit {
  mdCn = LazyComponentMdCn;
  mdEn = LazyComponentMdEn;

  constructor() {}

  ngOnInit() {}
}

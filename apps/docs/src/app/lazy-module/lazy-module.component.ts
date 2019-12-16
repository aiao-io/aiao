import { Component, OnInit } from '@angular/core';

import { LazyModuleMdCn, LazyModuleMdEn } from '../markdown/markdown';

@Component({
  selector: 'aiao-lazy-module',
  templateUrl: './lazy-module.component.html',
  styleUrls: ['./lazy-module.component.scss']
})
export class LazyModuleComponent implements OnInit {
  mdCn = LazyModuleMdCn;
  mdEn = LazyModuleMdEn;
  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';

import { StencilToolkitMdCn, StencilToolkitMdEn } from '../markdown/markdown';

@Component({
  selector: 'aiao-stencil-toolkit',
  templateUrl: './stencil-toolkit.component.html',
  styleUrls: ['./stencil-toolkit.component.scss']
})
export class StencilToolkitComponent implements OnInit {
  mdCn = StencilToolkitMdCn;
  mdEn = StencilToolkitMdEn;
  constructor() {}

  ngOnInit() {}
}

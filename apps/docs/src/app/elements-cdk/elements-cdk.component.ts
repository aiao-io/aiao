import { Component, OnInit } from '@angular/core';

import { ElementsCdkMdCn } from '../markdown/markdown';

@Component({
  selector: 'aiao-elements-cdk',
  templateUrl: './elements-cdk.component.html',
  styleUrls: ['./elements-cdk.component.scss']
})
export class ElementsCdkComponent implements OnInit {
  mdCn = ElementsCdkMdCn;

  constructor() {}

  ngOnInit() {}
}

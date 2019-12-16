import { Component, OnInit } from '@angular/core';

import { ElementsAngularMdCn } from '../markdown/markdown';

@Component({
  selector: 'aiao-elements-angular',
  templateUrl: './elements-angular.component.html',
  styleUrls: ['./elements-angular.component.scss']
})
export class ElementsAngularComponent implements OnInit {
  mdCn = ElementsAngularMdCn;
  constructor() {}

  ngOnInit() {}
}

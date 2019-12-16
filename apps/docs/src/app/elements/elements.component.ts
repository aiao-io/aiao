import { Component, OnInit } from '@angular/core';

import { ElementsMdCn } from '../markdown/markdown';

@Component({
  selector: 'aiao-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss']
})
export class ElementsComponent implements OnInit {
  mdCn = ElementsMdCn;

  constructor() {}

  ngOnInit() {}
}

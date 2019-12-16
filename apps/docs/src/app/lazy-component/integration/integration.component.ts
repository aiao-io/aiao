import { Component, OnInit } from '@angular/core';

import { LazyComponentIntegrationMdCn } from '../../markdown/markdown';

@Component({
  selector: 'aiao-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent implements OnInit {
  mdCn = LazyComponentIntegrationMdCn;
  constructor() {}

  ngOnInit() {}
}

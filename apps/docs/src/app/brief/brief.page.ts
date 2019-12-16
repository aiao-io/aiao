import { Component } from '@angular/core';

import { BriefMdCn, BriefMdEn } from '../markdown/markdown';

@Component({
  selector: 'aiao-brief',
  templateUrl: 'brief.page.html',
  styleUrls: ['brief.page.scss']
})
export class BriefPage {
  mdCn = BriefMdCn;
  mdEn = BriefMdEn;

  constructor() {}
}

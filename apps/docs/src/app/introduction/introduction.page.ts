import { Component } from '@angular/core';

@Component({
  selector: 'aiao-introduction',
  templateUrl: 'introduction.page.html',
  styleUrls: ['introduction.page.scss']
})
export class IntroductionPage {
  constructor() {}

  onLoad(event: any) {
    // console.log('event', event);
  }

  onError(event: any) {
    console.log('error event', event);
  }
}

import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'aiao-introduction',
  templateUrl: 'introduction.page.html',
  styleUrls: ['introduction.page.scss']
})
export class IntroductionPage implements OnInit {
  language$ = this.store.pipe(select('language'));

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.language$.pipe(
      tap(d => {
        console.log('lang is', d);
      })
    );
  }
}

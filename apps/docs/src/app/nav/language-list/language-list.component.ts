import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';

import { changeLanguageAction } from '../../local/language.actions';
import { LocalState, selectLanguage } from '../../local/language.reducer';

@Component({
  selector: 'aiao-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss']
})
export class LanguageListComponent implements OnInit {
  lang$ = this.store.pipe(select(selectLanguage));
  constructor(private store: Store<LocalState>, private popoverController: PopoverController) {}

  ngOnInit() {}

  changeLanguage(language: string) {
    this.store.dispatch(changeLanguageAction({ language }));
    this.popoverController.dismiss();
  }
}

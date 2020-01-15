import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';

import { changeLanguageAction } from '../../local/language.actions';
import { ChangeLanguageState } from '../../local/language.reducer';

// import { LocalState, selectLanguage } from '../../local/language.reducer';

@Component({
  selector: 'aiao-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss']
})
export class LanguageListComponent implements OnInit {
  lang$: Observable<string>;
  constructor(private store: Store<{ language: ChangeLanguageState }>, private popoverController: PopoverController) {
    this.lang$ = this.store.pipe(
      select('language'),
      map(lang => lang.language)
    );
  }

  ngOnInit() {}

  changeLanguage(language: string) {
    this.store.dispatch(changeLanguageAction({ language }));
    this.popoverController.dismiss();
  }
}

import { MarkdownModule } from 'ngx-markdown';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';

import { CHANGE_LANGUAGE_Key, changeLanguageReducer } from '../local/language.reducer';
import { IntroductionPage } from './introduction.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MarkdownModule,
    RouterModule.forChild([
      {
        path: '',
        component: IntroductionPage
      }
    ]),
    StoreModule.forFeature(CHANGE_LANGUAGE_Key, changeLanguageReducer)
  ],
  declarations: [IntroductionPage]
})
export class IntroductionPageModule {}

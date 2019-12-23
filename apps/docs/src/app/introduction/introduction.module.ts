import { MarkdownModule } from 'ngx-markdown';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { IntroductionPage } from './introduction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarkdownModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: IntroductionPage
      }
    ])
  ],
  declarations: [IntroductionPage]
})
export class IntroductionPageModule {}

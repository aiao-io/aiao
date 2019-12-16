import { MarkdownModule } from 'ngx-markdown';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { BriefPage } from './brief.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarkdownModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: BriefPage
      }
    ])
  ],
  declarations: [BriefPage]
})
export class BriefPageModule {}

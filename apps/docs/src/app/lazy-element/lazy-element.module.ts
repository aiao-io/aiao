import { MarkdownModule } from 'ngx-markdown';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LazyElementComponent } from './lazy-element.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MarkdownModule,
    RouterModule.forChild([
      {
        path: '',
        component: LazyElementComponent
      }
    ])
  ],
  declarations: [LazyElementComponent]
})
export class LazyElementModule {}

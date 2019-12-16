import { MarkdownModule } from 'ngx-markdown';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LazyComponentComponent } from './lazy-component.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MarkdownModule,
    RouterModule.forChild([
      {
        path: '',
        component: LazyComponentComponent
      }
    ])
  ],
  declarations: [LazyComponentComponent]
})
export class LazyComponentModule {}

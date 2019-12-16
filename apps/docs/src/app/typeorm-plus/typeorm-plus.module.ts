import { MarkdownModule } from 'ngx-markdown';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { TypeormPlusComponent } from './typeorm-plus.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MarkdownModule,
    RouterModule.forChild([
      {
        path: '',
        component: TypeormPlusComponent
      }
    ])
  ],
  declarations: [TypeormPlusComponent]
})
export class TypeormPlusModule {}

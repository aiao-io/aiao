import { MarkdownModule } from 'ngx-markdown';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ColorComponent } from './color.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MarkdownModule,
    RouterModule.forChild([
      {
        path: '',
        component: ColorComponent
      }
    ])
  ],
  declarations: [ColorComponent]
})
export class ColorModule {}

import { MarkdownModule } from 'ngx-markdown';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { IntegrationComponent } from './integration.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MarkdownModule,
    RouterModule.forChild([
      {
        path: '',
        component: IntegrationComponent
      }
    ])
  ],
  declarations: [IntegrationComponent]
})
export class IntegrationModule {}

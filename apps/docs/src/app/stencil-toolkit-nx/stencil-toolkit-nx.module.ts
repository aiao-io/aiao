import { MarkdownModule } from 'ngx-markdown';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { StencilToolkitNxComponent } from './stencil-toolkit-nx.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MarkdownModule,
    RouterModule.forChild([
      {
        path: '',
        component: StencilToolkitNxComponent
      }
    ])
  ],
  declarations: [StencilToolkitNxComponent]
})
export class StencilToolkitNxModule {}

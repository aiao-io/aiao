import { MarkdownModule } from 'ngx-markdown';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { IntegrationComponent } from './integration/integration.component';
import { LazyElementComponent } from './lazy-element.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'introduction',
    pathMatch: 'full'
  },
  {
    path: 'introduction',
    component: LazyElementComponent
  },
  {
    path: 'integration',
    component: IntegrationComponent
  }
];

@NgModule({
  imports: [CommonModule, IonicModule, MarkdownModule, RouterModule.forChild(routes)],
  declarations: [LazyElementComponent, IntegrationComponent]
})
export class LazyElementModule {}

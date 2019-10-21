import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { DocsPage } from './docs.page';

const routes: Routes = [
  {
    path: '',
    component: DocsPage
  }
];

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [DocsPage]
})
export class DocsPageModule {}

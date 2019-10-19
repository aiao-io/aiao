import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LazyModuleComponent } from './lazy-module.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: '', component: LazyModuleComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [LazyModuleComponent]
})
export class LazyModuleModule {}

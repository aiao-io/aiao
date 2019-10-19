import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LazyModuleComponent } from './lazy-module.component';

const routes: Routes = [{ path: '', component: LazyModuleComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [LazyModuleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LazyModuleModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent]
})
export class NotFoundPageModule {}

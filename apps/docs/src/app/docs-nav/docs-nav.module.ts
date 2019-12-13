import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { DocsNavComponent } from './docs-nav.component';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [DocsNavComponent],
  exports: [DocsNavComponent]
})
export class DocsNavModule {}

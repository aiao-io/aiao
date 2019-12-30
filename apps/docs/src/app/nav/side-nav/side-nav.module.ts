import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { SideNavComponent } from './side-nav.component';

@NgModule({
  imports: [CommonModule, IonicModule, MatTreeModule, RouterModule],
  declarations: [SideNavComponent],
  exports: [SideNavComponent]
})
export class SideNavModule {}

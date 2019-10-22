import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule, RouterModule],
  exports: [FooterComponent, NavbarComponent],
  declarations: [FooterComponent, NavbarComponent]
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageListComponent } from './language-list.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [LanguageListComponent],
  exports: [LanguageListComponent],
  entryComponents: [LanguageListComponent]
})
export class LanguageListModule {}

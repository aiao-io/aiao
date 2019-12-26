import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { LanguageListComponent } from './language-list.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [LanguageListComponent],
  entryComponents: [LanguageListComponent],
  exports: [LanguageListComponent]
})
export class LanguageListModule {}

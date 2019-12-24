import { Component } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { LanguageListComponent } from './nav/language-list/language-list.component';

@Component({
  selector: 'aiao-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private menuController: MenuController, public popoverController: PopoverController) {}

  toggleNavMenu() {
    this.menuController.toggle('docs-menu');
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LanguageListComponent,
      event: ev,
      showBackdrop: false,
      cssClass: 'language-list-popover'
    });
    return await popover.present();
  }
}

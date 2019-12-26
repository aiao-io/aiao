import { Component } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';

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
}

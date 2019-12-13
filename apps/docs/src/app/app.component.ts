import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'aiao-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private menuController: MenuController) {}

  toggleNavMenu() {
    this.menuController.toggle('docs-menu');
  }
}

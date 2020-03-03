import { Component } from '@angular/core';

interface IMenu {
  url: string;
  icon?: string;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public selectedIndex = 0;
  public menus: IMenu[] = [
    {
      title: 'Code Editor',
      url: '/code-editor',
      icon: 'link'
    },
    {
      title: 'Elements Editor',
      url: '/elements-editor',
      icon: 'link'
    },
    {
      title: 'Elements Preview',
      url: '/elements-preview',
      icon: 'link'
    },
    {
      title: 'Text Editor',
      url: '/text-editor',
      icon: 'link'
    }
  ];
}

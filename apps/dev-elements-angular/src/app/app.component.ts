import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public selectedIndex = 0;
  public navs: { title: string; url: string; icon?: string }[] = [
    {
      title: 'Code Editor',
      url: '/code-editor'
    },
    {
      title: 'Elements Editor',
      url: '/elements-editor'
    },
    {
      title: 'Elements Preview',
      url: '/elements-preview'
    }
  ];
}

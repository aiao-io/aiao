import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazy-angular-element',
  templateUrl: './lazy-angular-element.component.html'
})
export class LazyAngularElementComponent implements OnInit {
  @Input() name = 'name';
  constructor() {}

  ngOnInit() {}
}

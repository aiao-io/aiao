import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'aiao-custom-element',
  templateUrl: './custom-element.component.html',
  styleUrls: ['./custom-element.component.scss']
})
export class CustomElementComponent implements OnInit {
  @Input() name = 'word';
  constructor() {}

  ngOnInit() {}
}

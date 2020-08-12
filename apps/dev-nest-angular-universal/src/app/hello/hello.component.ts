import { Component, OnInit } from '@angular/core';

import { APIService } from './api.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {
  hello$ = this.api.hello();

  constructor(private api: APIService) {}
  ngOnInit(): void {}
}

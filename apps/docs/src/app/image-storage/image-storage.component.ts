import { Component, OnInit } from '@angular/core';

import { ImageStorageMdCn } from '../markdown/markdown';

@Component({
  selector: 'aiao-image-storage',
  templateUrl: './image-storage.component.html',
  styleUrls: ['./image-storage.component.scss']
})
export class ImageStorageComponent implements OnInit {
  mdCn = ImageStorageMdCn;
  // mdEn = ImageStorageMdEn;

  constructor() {}

  ngOnInit() {}
}

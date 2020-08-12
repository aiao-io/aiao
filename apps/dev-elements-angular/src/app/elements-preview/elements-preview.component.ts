import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-elements-preview',
  templateUrl: './elements-preview.component.html',
  styleUrls: ['./elements-preview.component.scss']
})
export class ElementsPreviewComponent implements OnInit {
  form!: FormGroup;
  config = [
    {
      tag: 'h1',
      innerText: true,
      defaultOptions: {
        innerText: 'h1h1h1h1'
      }
    }
  ];
  data = [
    {
      tag: 'ion-button',
      innerText: 'button',
      class: {
        a: true
      },
      attributes: {
        mode: 'ios'
      },
      style: {
        minWidth: '200px'
      }
    },
    {
      tag: 'h1'
    },
    {
      tag: 'div',
      children: [
        {
          tag: 'h1',
          innerText: 'true'
        }
      ]
    },
    {
      tag: 'aiao-img',
      attributes: {
        src: 'http://image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg'
      }
    }
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      config: [this.config],
      elements: [this.data]
    });
    this.form.valueChanges.subscribe(d => {
      console.log('valueChanges', d);
    });
  }
}

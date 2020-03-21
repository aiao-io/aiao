import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-elements-editor',
  templateUrl: './elements-editor.component.html',
  styleUrls: ['./elements-editor.component.scss']
})
export class ElementsEditorComponent implements OnInit {
  form: FormGroup;
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
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      elements: [this.data]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(d => {
      console.log('valueChanges', d);
    });
  }
}

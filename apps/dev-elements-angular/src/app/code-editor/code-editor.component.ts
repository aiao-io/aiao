import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-elements-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class ElementsCodeEditorComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      json: {
        b: 1
      }
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(d => {
      console.log('valueChanges', d);
    });
  }
}

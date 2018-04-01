import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'reactive-form-demo',
  templateUrl: 'reactive-form-demo.component.html'
})
export class ReactiveFormDemoComponent implements OnInit {
  heroForm: FormGroup;
  language = 'en';
  editorValue = '';
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.heroForm = this.fb.group({
      html: ''
    });
  }
}

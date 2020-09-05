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
  editorConfig = {
    extraPlugins: 'wordcount',
    wordcount: {
      // Whether or not you want to show the Word Count
      showWordCount: true,
      // Whether or not you want to show the Char Count
      showCharCount: true
      // Maximum allowed Word Count
      // maxWordCount: 4,
      // Maximum allowed Char Count
      // maxCharCount: 10
    }
  };
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.heroForm = this.fb.group({
      html: ''
    });
  }

  editorValueChange(value: string) {
    console.log('new value:', value);
  }
}

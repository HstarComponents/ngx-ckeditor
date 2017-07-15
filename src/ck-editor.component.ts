import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ck-editor',
  templateUrl: './ck-editor.component.html'
})

export class CKEditorComponent implements OnInit {

  @Input()
  public readonly: boolean = false;

  constructor() { }

  ngOnInit() { }
}

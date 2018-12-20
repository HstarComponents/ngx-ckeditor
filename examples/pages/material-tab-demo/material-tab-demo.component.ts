import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'material-tab-demo',
  templateUrl: 'material-tab-demo.component.html'
})
export class MaterialTabDemoComponent implements OnInit {
  ngOnInit() {}

  public editorValue = 'Hello, Editor!';

  public handleValueChange(value: string) {
    console.log('change to', value);
  }
}

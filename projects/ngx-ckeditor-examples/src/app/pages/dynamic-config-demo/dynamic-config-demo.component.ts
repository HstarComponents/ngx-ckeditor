import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dynamic-config-demo',
  templateUrl: 'dynamic-config-demo.component.html'
})
export class DynamicConfigDemoComponent implements OnInit {
  public editorValue: string = '';

  public editorConfig: any = {
    forceEnterMode: true,
    height: 250
  };

  public editorConfigStr: string = JSON.stringify(this.editorConfig);

  ngOnInit() {}

  public updateEditorConfig() {
    try {
      this.editorConfig = JSON.parse(this.editorConfigStr);
    } catch (e) {
      alert('Invalid json config.');
    }
  }

  public handleValueChange(ex: any) {
    console.log(ex);
  }
}

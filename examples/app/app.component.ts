import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {

  public editorValue: string = '';

  public setContent() {
    this.editorValue = '<p>1111</p>';
  }

  public getContent() {
    alert(this.editorValue);
  }

  ngOnInit() { }
}

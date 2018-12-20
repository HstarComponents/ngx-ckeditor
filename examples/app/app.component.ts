import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {}

  public menus = [
    { path: '/', title: 'Basic Demo' },
    { path: '/form', title: 'ReactiveForm Demo' },
    { path: '/dynamic-config', title: 'Dynamic Config' },
    { path: '/material-tab', title: 'Material Tab Demo' }
  ];
}

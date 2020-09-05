import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'inline-demo',
  templateUrl: 'inline-demo.component.html',
  styles: [
    `
      .inline-editor-box {
        height: 200px;
        width: 100%;
        border: 1px solid #ccc;
        padding: 15px;
      }
    `
  ]
})
export class InlineDemoComponent implements OnInit {
  public comments: string = `<p>hi<br>
  thanks for your time!<br>
  i want to use inline mode but i have error.error title is:<br>
  <code>ERROR TypeError: "b.container is undefined"</code></p>`;

  ngOnInit() {}
}

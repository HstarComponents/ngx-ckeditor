import { Component, OnInit, ViewChild } from '@angular/core';

import { CKEditorComponent } from '../../lib';

@Component({
  selector: 'basic-demo',
  templateUrl: 'basic-demo.component.html'
})
export class BasicDemoComponent implements OnInit {
  public editorValue: string = '';
  public language = 'en';

  public setContent() {
    this.editorValue = '<p>1111</p>';
  }

  public getContent() {
    alert(this.editorValue);
  }

  changeLanguage() {
    this.language = this.language === 'en' ? 'de' : 'en';
  }

  @ViewChild('ckEditor') ckEditor: CKEditorComponent;
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._addImageUploadBtn();
  }

  handleValueChange(value: string) {
    console.log('new value', value);
  }

  _addImageUploadBtn() {
    const editor = this.ckEditor && this.ckEditor.instance;
    if (!editor) {
      return;
    }
    editor.addCommand('uploadImage', {
      exec: function(editor: any) {
        // Remove img input.
        [].slice.apply(document.querySelectorAll('.ck-editor-upload-img')).forEach((img: any) => {
          img.remove();
        });
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('class', 'ck-editor-upload-img');
        input.style.display = 'none';
        input.addEventListener(
          'change',
          e => {
            const file = (e.target as HTMLInputElement).files[0];
            if (file) {
              // do upload then insert img link to editor
              const filepath = 'https://avatars0.githubusercontent.com/u/4043284?s=460&v=4';
              editor.insertHtml(`<img alt="" src="${filepath}"></img>`);
            }
          },
          false
        );
        document.body.appendChild(input);
        input.click();
      }
    });
    editor.ui.addButton('uploadImage', {
      icon: 'https://avatars1.githubusercontent.com/u/5500999?v=2&s=16',
      label: 'Upload Image',
      command: 'uploadImage',
      toolbar: 'insert'
    });
  }
}

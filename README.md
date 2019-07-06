# ngx-ckeditor

[ ![Travis CI Status](https://travis-ci.org/HstarComponents/ngx-ckeditor.svg?branch=master)](https://travis-ci.org/HstarComponents/ngx-ckeditor)

The CKEditor component for angular(2.x+)

# Usage

## Installation

- Import CKEditor js file

```html
<script src="//cdn.ckeditor.com/4.7.1/full/ckeditor.js"></script>
```

- Install `ngx-ckeditor`

```bash
npm i -S ngx-ckeditor
```

## Sample

Import `CKEditorModule` module in your main module:

```
// app.module.ts

import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
  imports: [
    // ...
    CKEditorModule
  ],
  // ...
})
export class AppModule {

}
```

Then use it in your component:

```html
// app.component.html

<ck-editor name="editor1" [(ngModel)]="editorValue" skin="moono-lisa" language="en" [fullPage]="true"></ck-editor>
```

```js
// app.component.ts

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {

  public editorValue: string = '';

  ngOnInit() { }
}
```

## `CKEditorComponent` Options

| Type    | Name     | DataType | Default Value | Description                                                     |
| ------- | -------- | -------- | ------------- | --------------------------------------------------------------- |
| Input   | readonly | boolean  | false         | Enabled / disable readonly on editor                            |
| Input   | skin     | string   | 'moono-lisa'  | Set the editor skin                                             |
| Input   | language | string   | 'en'          | Set the editor language                                         |
| Input   | fullPage | boolean  | false         | Enalbed /disable fullPage mode on editor                        |
| Input   | config   | object   | {}            | CKEditor's config object, [see more](http://docs.ckeditor.com/) |
| Input   | inline   | boolean  | false         | Set the inline mode                                             |
| Two-way | ngModel  | string   |               | Two-way binding value                                           |

# Version Rules (Imports)

In order to match angular version, the `ngx-ckeditor` version no will same as angular majar version.

* 0.2.x: for angular 2.x ~ 4.x 
* 0.4.x: for angular 5.x ~ 7.x 
* 8.x.x: for angular 8.x


# How to develop?

```bash
git clone https://github.com/HstarComponents/ngx-ckeditor.git

# install deps
npm i

# run dev
npm run dev 
# or
npm start

# build demo
npm run build:demo

# build lib
npm run build:lib

# publish
npm run publish:lib

# test
npm test
```

# FAQ?

1、Metadata version mismatch found version 4, expected 3

A: That because the lib is build for angular 5.x, it will throw the error when your used angular version is 4.x, please use `ngx-ckeditor@0.2.x` for angular 4.x.

# Issues

[Create an issue](https://github.com/HstarComponents/ngx-ckeditor/issues/new)

# [Changelog]

[Changelog](https://github.com/HstarComponents/ngx-ckeditor/blob/master/CHANGELOG.md)

# License

[MIT License](https://github.com/HstarComponents/ngx-ckeditor/blob/master/LICENSE)


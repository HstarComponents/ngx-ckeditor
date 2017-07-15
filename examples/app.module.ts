import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CKEditorModule } from '../src';

import { AppComponent } from './app/app.component';

@NgModule({
  imports: [
    BrowserModule,
    CKEditorModule
  ],
  declarations: [AppComponent],
  providers: [/* TODO: Providers go here */],
  bootstrap: [AppComponent],
})
export class AppModule {

}

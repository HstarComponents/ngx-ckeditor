import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CKEditorModule } from '../src';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app/app.component';
import { PAGES } from './pages';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, CKEditorModule, AppRoutingModule],
  declarations: [AppComponent, ...PAGES],
  providers: [
    /* TODO: Providers go here */
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { PAGES } from './pages';
import { CKEditorModule } from './lib';
import { AppRoutingModule } from './app.routing';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, CKEditorModule, AppRoutingModule],
  declarations: [AppComponent, ...PAGES],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

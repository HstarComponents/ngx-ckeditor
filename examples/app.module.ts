import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { AppComponent } from './app/app.component';
import { PAGES } from './pages';
import { CKEditorModule } from './lib';
import { AppRoutingModule } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  declarations: [AppComponent, ...PAGES],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

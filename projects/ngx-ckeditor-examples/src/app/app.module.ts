import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { AppComponent } from './app.component';
import { PAGES } from './pages';
import { CKEditorModule } from './dep';

@NgModule({
  declarations: [AppComponent, ...PAGES],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, CKEditorModule, MatTabsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

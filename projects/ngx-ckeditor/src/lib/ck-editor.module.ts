import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorComponent } from './ck-editor.component';

@NgModule({
  imports: [],
  exports: [FormsModule, CKEditorComponent],
  declarations: [CKEditorComponent],
  providers: []
})
export class CKEditorModule {}

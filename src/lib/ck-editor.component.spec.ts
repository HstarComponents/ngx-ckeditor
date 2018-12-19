import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CKEditorComponent } from './ck-editor.component';

describe('CkeditorComponent', () => {
  let component: CKEditorComponent;
  let fixture: ComponentFixture<CKEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CKEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CKEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

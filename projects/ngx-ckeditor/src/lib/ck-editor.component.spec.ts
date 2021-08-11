import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CKEditorComponent } from './ck-editor.component';

describe('CkeditorComponent', () => {
  let component: CKEditorComponent;
  let fixture: ComponentFixture<CKEditorComponent>;

  beforeEach(waitForAsync(() => {
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

  it('should init editor', () => {
    component.ngOnChanges({});
    expect(fixture.nativeElement.querySelector('textarea')).toBeTruthy();
    component.writeValue('12345');
  });
});

import {
  Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef,
  OnDestroy, OnChanges, SimpleChanges, AfterViewInit,
  NgZone
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

declare var CKEDITOR: any;

const defaults = {
  contentsCss: [''],
  customConfig: ''
};

export const CKEDITOR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CKEditorComponent),
  multi: true
};

@Component({
  selector: 'ck-editor',
  template: `<textarea #ck></textarea>`,
  providers: [CKEDITOR_VALUE_ACCESSOR]
})
export class CKEditorComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, ControlValueAccessor {

  private ckIns: any;
  private onChange(_: any) { };
  private onTouched() { };
  private innerValue: string = '';

  @Input()
  public readonly: boolean = false;

  @Input()
  public config: any = {};

  @Input()
  public skin: string = 'moono-lisa';

  @Input()
  public language: string = 'en';

  @Input()
  public fullPage: boolean = false;
  @Input()
  public inline: boolean = false;

  @ViewChild('ck')
  public ck: ElementRef;

  constructor(private ngZone: NgZone) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.ckIns) {
      return;
    }
    if (changes.readonly) {
      this.ckIns.setReadOnly(this.readonly);
    }
  }

  ngOnDestroy() {
    if (this.ckIns) {
      CKEDITOR.instances[this.ckIns.name].destroy();
      this.ckIns.destroy();
      this.ckIns = null;
    }
  }

  ngAfterViewInit() {
    this.initCKEditor();
  }

  private initCKEditor() {
    if (typeof CKEDITOR === 'undefined') {
      return console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
    }
    let opt = Object.assign({}, defaults, this.config, {
      readOnly: this.readonly,
      skin: this.skin,
      language: this.language,
      fullPage: this.fullPage,
      inline: this.inline
    });
    this.ckIns = opt.inline ? CKEDITOR.inline(this.ck.nativeElement, opt) : CKEDITOR.replace(this.ck.nativeElement, opt);
    this.ckIns.setData(this.innerValue);
    this.ckIns.on('change', () => {
      this.onTouched();
      let val = this.ckIns.getData();
      this.updateValue(val);
    });
  }

  private updateValue(value: string) {
    this.ngZone.run(() => {
      this.innerValue = value;
      this.onChange(value); // 通知外部ngModel更新
      this.onTouched();
    });
  }

  writeValue(value: any): void {
    this.innerValue = value || '';
    if (this.ckIns) {
      this.ckIns.setData(this.innerValue);
      // 修复FullPage模式下，当连续设置两次不带html标记的值时，不会触发change事件，导致ngModel无法更新的bug。
      let val = this.ckIns.getData();
      this.ckIns.setData(val);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {

  }
}

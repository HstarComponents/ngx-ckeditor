import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  providers: [CKEDITOR_VALUE_ACCESSOR],
  exportAs: 'ckEditor'
})
export class CKEditorComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, ControlValueAccessor {
  private ckIns: any;
  private onChange(_: any) {}
  private onTouched() {}
  private innerValue: string = '';
  public get instance() {
    return this.ckIns;
  }

  @Input() public readonly: boolean = false;

  @Input() public config: any = {};

  @Input() public skin: string = 'moono-lisa';

  @Input() public language: string = 'en';

  @Input() public fullPage: boolean = false;

  @ViewChild('ck') public ck: ElementRef;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {}

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
      this.ckIns.removeAllListeners();
      window['CKEDITOR'].instances[this.ckIns.name].destroy();
      this.ckIns.destroy();
      this.ckIns = null;
    }
  }

  ngAfterViewInit() {
    this.initCKEditor();
  }

  private initCKEditor() {
    if (typeof window['CKEDITOR'] === 'undefined') {
      return console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
    }
    let opt = Object.assign({}, defaults, this.config, {
      readOnly: this.readonly,
      skin: this.skin,
      language: this.language,
      fullPage: this.fullPage
    });
    this.ckIns = window['CKEDITOR'].replace(this.ck.nativeElement, opt);
    this.ckIns.setData(this.innerValue);
    this.ckIns.on('change', () => {
      this.onTouched();
      let val = this.ckIns.getData();
      console.warn('chagne', val);
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
    console.log(value);
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
  setDisabledState?(isDisabled: boolean): void {}
}

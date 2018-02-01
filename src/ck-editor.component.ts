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

  private propagateChange(_: any) {}
  private propagateTouch() {}

  private innerValue: string = '';

  public get instance() {
    return this.ckIns;
  }

  private identifier: string;

  @Input() public readonly: boolean = false;
  @Input() public config: any = {};
  @Input() public skin: string = 'moono-lisa';
  @Input() public language: string = 'en';
  @Input() public fullPage: boolean = false;

  @Output() change = new EventEmitter();
  @Output() ready = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  @ViewChild('ck') public ck: ElementRef;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.destroyCKEditor();
    this.initCKEditor(CKEditorComponent.getRandomIdentifier());
  }

  private static getRandomIdentifier() {
    return 'editor-' + Math.round(Math.random() * 100000000);
  }

  ngOnDestroy() {
    this.destroyCKEditor();
  }

  ngAfterViewInit() {}

  private initCKEditor(identifier: string) {
    if (typeof window['CKEDITOR'] === 'undefined') {
      return console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
    }

    this.identifier = identifier;
    this.ck.nativeElement.setAttribute('name', identifier);

    let opt = Object.assign({}, defaults, this.config, {
      readOnly: this.readonly,
      skin: this.skin,
      language: this.language,
      fullPage: this.fullPage
    });
    this.ckIns = window['CKEDITOR'].replace(this.ck.nativeElement, opt);
    this.ckIns.setData(this.innerValue);

    this.ckIns.on('change', () => {
      let val = this.ckIns.getData();
      this.updateValue(val);
    });

    this.ckIns.on('instanceReady', (evt: any) => {
      this.ngZone.run(() => {
        this.ready.emit(evt);
      });
    });

    this.ckIns.on('blur', (evt: any) => {
      this.ngZone.run(() => {
        this.blur.emit(evt);
        this.propagateTouch();
      });
    });

    this.ckIns.on('focus', (evt: any) => {
      this.ngZone.run(() => {
        this.focus.emit(evt);
      });
    });
  }

  private destroyCKEditor() {
    if (this.ckIns) {
      this.ckIns.removeAllListeners();
      window['CKEDITOR'].remove(window['CKEDITOR'].instances[this.ckIns.name]);
      this.ckIns.destroy();
      this.ckIns = null;
      document.querySelector('#cke_' + this.identifier).remove();
    }
  }

  private updateValue(value: string) {
    this.ngZone.run(() => {
      this.innerValue = value;
      this.propagateChange(value);
      this.propagateTouch();
      this.change.emit(value);
    });
  }

  writeValue(value: any): void {
    this.innerValue = value || '';
    if (this.ckIns) {
      // Fix bug that can't emit change event when set non-html tag value twice in fullpage mode.
      this.ckIns.setData(this.innerValue);
      let val = this.ckIns.getData();
      this.ckIns.setData(val);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}

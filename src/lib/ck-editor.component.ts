import {
  AfterViewInit,
  AfterViewChecked,
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

declare var CKEDITOR: any;

const defaults = {
  contentsCss: [''],
  customConfig: ''
};

@Component({
  selector: 'ck-editor',
  template: `
    <textarea #textarea aria-label="editor content"></textarea>
  `,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CKEditorComponent), multi: true }],
  exportAs: 'ckEditor'
})
export class CKEditorComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked, ControlValueAccessor {
  private static idx = 1;

  private ckIns: any;
  private innerValue = '';
  private identifier: string;
  private disabled = false;
  private editorInitialized = false;

  /**
   * Is readonly mode, default:false
   */
  @Input() public readonly = false;
  /**
   * The ck-editor config object.
   */
  @Input() public config: any = {};
  /**
   * The special skin, default: moono-lisa
   */
  @Input() public skin = 'moono-lisa';
  /**
   * The special language, default: en
   */
  @Input() public language = 'en';
  /**
   * Use fullpage mode, default:false
   */
  @Input() public fullPage = false;
  /**
   * Use inline mode, default: false
   */
  @Input() public inline = false;
  /**
   * The editor id
   */
  @Input() public id: string;

  @Output() public change = new EventEmitter();
  @Output() public ready = new EventEmitter();
  @Output() public blur = new EventEmitter();
  @Output() public focus = new EventEmitter();

  @ViewChild('textarea', { static: false }) public textareaRef: ElementRef;

  private static getRandomIdentifier(id: string = '') {
    return 'editor-' + (id !== '' ? id : String(CKEditorComponent.idx++));
  }

  onChange = (value: string) => {};
  onTouched = () => {};

  public get instance() {
    return this.ckIns;
  }

  constructor(private ngZone: NgZone, private hostEl: ElementRef) {
    this.identifier = CKEditorComponent.getRandomIdentifier(this.id);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editorInitialized) {
      this.destroyEditor();
      this.initEditor(this.identifier);
    }
  }

  ngAfterViewChecked() {
    if (!this.editorInitialized && this.documentContains(this.textareaRef.nativeElement)) {
      this.editorInitialized = true;
      this.initEditor(this.identifier);
    } else if (this.editorInitialized && !this.documentContains(this.textareaRef.nativeElement)) {
      this.editorInitialized = false;
      this.destroyEditor();
    }
  }

  ngOnDestroy() {
    this.destroyEditor();
  }

  private initEditor(identifier: string) {
    if (typeof CKEDITOR === 'undefined') {
      return console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
    }
    const textareaEl = this.textareaRef.nativeElement;
    this.identifier = identifier;
    textareaEl.setAttribute('name', this.identifier);
    if (this.ckIns || !this.documentContains(this.textareaRef.nativeElement)) {
      return;
    }

    const opt = Object.assign({}, defaults, this.config, {
      readOnly: this.readonly,
      skin: this.skin,
      language: this.language,
      fullPage: this.fullPage,
      inline: this.inline
    });

    this.ckIns = this.inline ? CKEDITOR.inline(textareaEl, opt) : CKEDITOR.replace(textareaEl, opt);
    this.ckIns.setData(this.innerValue);

    this.ckIns.on('change', () => {
      const val = this.ckIns.getData();
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
        this.onTouched();
      });
    });

    this.ckIns.on('focus', (evt: any) => {
      this.ngZone.run(() => {
        this.focus.emit(evt);
      });
    });
  }

  private destroyEditor() {
    if (this.ckIns) {
      // If use destroy, will fire 'Error code: editor-destroy-iframe'
      // this.ckIns.destroy();
      if (CKEDITOR.instances.hasOwnProperty(this.ckIns.name)) {
        CKEDITOR.remove(CKEDITOR.instances[this.ckIns.name]);
      }
      this.ckIns = null;
      const editorEl = this.hostEl.nativeElement.querySelector('#cke_' + this.identifier);
      if (editorEl != null && editorEl.parentElement) {
        editorEl.parentElement.removeChild(editorEl);
      }
    }
  }

  private updateValue(value: string) {
    this.ngZone.run(() => {
      this.innerValue = value;
      this.onChange(value);
      this.onTouched();
      this.change.emit(value);
    });
  }

  private documentContains(node: Node) {
    return document.contains ? document.contains(node) : document.body.contains(node);
  }

  writeValue(value: any): void {
    this.innerValue = value || '';
    if (this.ckIns) {
      // Fix bug that can't emit change event when set non-html tag value twice in fullpage mode.
      this.ckIns.setData(this.innerValue);
      const val = this.ckIns.getData();
      this.ckIns.setData(val);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

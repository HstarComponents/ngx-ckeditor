import { OnInit, ElementRef, OnDestroy, OnChanges, SimpleChanges, AfterViewInit, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const CKEDITOR_VALUE_ACCESSOR: any;
export declare class CKEditorComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, ControlValueAccessor {
    private ngZone;
    private ckIns;
    private onChange(_);
    private onTouched();
    private innerValue;
    readonly: boolean;
    config: any;
    skin: string;
    language: string;
    fullPage: boolean;
    ck: ElementRef;
    constructor(ngZone: NgZone);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    private initCKEditor();
    private updateValue(value);
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var defaults = {
    contentsCss: [''],
    customConfig: ''
};
exports.CKEDITOR_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CKEditorComponent; }),
    multi: true
};
var CKEditorComponent = (function () {
    function CKEditorComponent(ngZone) {
        this.ngZone = ngZone;
        this.innerValue = '';
        this.readonly = false;
        this.config = {};
        this.skin = 'moono-lisa';
        this.language = 'en';
        this.fullPage = false;
    }
    CKEditorComponent.prototype.onChange = function (_) { };
    ;
    CKEditorComponent.prototype.onTouched = function () { };
    ;
    CKEditorComponent.prototype.ngOnInit = function () { };
    CKEditorComponent.prototype.ngOnChanges = function (changes) {
        if (!this.ckIns) {
            return;
        }
        if (changes.readonly) {
            this.ckIns.setReadOnly(this.readonly);
        }
    };
    CKEditorComponent.prototype.ngOnDestroy = function () {
        if (this.ckIns) {
            this.ckIns.removeAllListeners();
            CKEDITOR.instances[this.ckIns.name].destroy();
            this.ckIns.destroy();
            this.ckIns = null;
        }
    };
    CKEditorComponent.prototype.ngAfterViewInit = function () {
        this.initCKEditor();
    };
    CKEditorComponent.prototype.initCKEditor = function () {
        var _this = this;
        if (typeof CKEDITOR === 'undefined') {
            return console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
        }
        var opt = Object.assign({}, defaults, this.config, {
            readOnly: this.readonly,
            skin: this.skin,
            language: this.language,
            fullPage: this.fullPage
        });
        this.ckIns = CKEDITOR.replace(this.ck.nativeElement, opt);
        this.ckIns.setData(this.innerValue);
        this.ckIns.on('change', function () {
            _this.onTouched();
            var val = _this.ckIns.getData();
            console.warn('chagne', val);
            _this.updateValue(val);
        });
    };
    CKEditorComponent.prototype.updateValue = function (value) {
        var _this = this;
        this.ngZone.run(function () {
            _this.innerValue = value;
            _this.onChange(value); // 通知外部ngModel更新
            _this.onTouched();
        });
    };
    CKEditorComponent.prototype.writeValue = function (value) {
        console.log(value);
        this.innerValue = value || '';
        if (this.ckIns) {
            this.ckIns.setData(this.innerValue);
            // 修复FullPage模式下，当连续设置两次不带html标记的值时，不会触发change事件，导致ngModel无法更新的bug。
            var val = this.ckIns.getData();
            this.ckIns.setData(val);
        }
    };
    CKEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    CKEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    CKEditorComponent.prototype.setDisabledState = function (isDisabled) {
    };
    CKEditorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ck-editor',
                    template: "<textarea #ck></textarea>",
                    providers: [exports.CKEDITOR_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    CKEditorComponent.ctorParameters = function () { return [
        { type: core_1.NgZone, },
    ]; };
    CKEditorComponent.propDecorators = {
        'readonly': [{ type: core_1.Input },],
        'config': [{ type: core_1.Input },],
        'skin': [{ type: core_1.Input },],
        'language': [{ type: core_1.Input },],
        'fullPage': [{ type: core_1.Input },],
        'ck': [{ type: core_1.ViewChild, args: ['ck',] },],
    };
    return CKEditorComponent;
}());
exports.CKEditorComponent = CKEditorComponent;
//# sourceMappingURL=ck-editor.component.js.map
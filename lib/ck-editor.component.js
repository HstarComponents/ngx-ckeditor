"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var CKEditorComponent = /** @class */ (function () {
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
    CKEditorComponent.prototype.onTouched = function () { };
    Object.defineProperty(CKEditorComponent.prototype, "instance", {
        get: function () {
            return this.ckIns;
        },
        enumerable: true,
        configurable: true
    });
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
            window['CKEDITOR'].instances[this.ckIns.name].destroy();
            this.ckIns.destroy();
            this.ckIns = null;
        }
    };
    CKEditorComponent.prototype.ngAfterViewInit = function () {
        this.initCKEditor();
    };
    CKEditorComponent.prototype.initCKEditor = function () {
        var _this = this;
        if (typeof window['CKEDITOR'] === 'undefined') {
            return console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
        }
        var opt = Object.assign({}, defaults, this.config, {
            readOnly: this.readonly,
            skin: this.skin,
            language: this.language,
            fullPage: this.fullPage
        });
        this.ckIns = window['CKEDITOR'].replace(this.ck.nativeElement, opt);
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
    CKEditorComponent.prototype.setDisabledState = function (isDisabled) { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CKEditorComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CKEditorComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CKEditorComponent.prototype, "skin", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CKEditorComponent.prototype, "language", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CKEditorComponent.prototype, "fullPage", void 0);
    __decorate([
        core_1.ViewChild('ck'),
        __metadata("design:type", core_1.ElementRef)
    ], CKEditorComponent.prototype, "ck", void 0);
    CKEditorComponent = __decorate([
        core_1.Component({
            selector: 'ck-editor',
            template: "<textarea #ck></textarea>",
            providers: [exports.CKEDITOR_VALUE_ACCESSOR],
            exportAs: 'ckEditor'
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], CKEditorComponent);
    return CKEditorComponent;
}());
exports.CKEditorComponent = CKEditorComponent;
//# sourceMappingURL=ck-editor.component.js.map
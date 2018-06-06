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
        this.inline = false;
        this.change = new core_1.EventEmitter();
        this.ready = new core_1.EventEmitter();
        this.blur = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
    }
    CKEditorComponent_1 = CKEditorComponent;
    CKEditorComponent.prototype.propagateChange = function (_) { };
    CKEditorComponent.prototype.propagateTouch = function () { };
    Object.defineProperty(CKEditorComponent.prototype, "instance", {
        get: function () {
            return this.ckIns;
        },
        enumerable: true,
        configurable: true
    });
    CKEditorComponent.prototype.ngOnInit = function () { };
    CKEditorComponent.prototype.ngOnChanges = function (changes) {
        this.destroyCKEditor();
        this.initCKEditor(CKEditorComponent_1.getRandomIdentifier(this.id));
    };
    CKEditorComponent.getRandomIdentifier = function (id) {
        if (id === void 0) { id = ''; }
        return 'editor-' + (id !== '' ? id : Math.round(Math.random() * 100000000));
    };
    CKEditorComponent.prototype.ngOnDestroy = function () {
        this.destroyCKEditor();
    };
    CKEditorComponent.prototype.ngAfterViewInit = function () {
        this.destroyCKEditor();
        this.initCKEditor(CKEditorComponent_1.getRandomIdentifier(this.id));
    };
    CKEditorComponent.prototype.initCKEditor = function (identifier) {
        var _this = this;
        if (typeof CKEDITOR === 'undefined') {
            return console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
        }
        this.identifier = identifier;
        this.ck.nativeElement.setAttribute('name', this.identifier);
        var opt = Object.assign({}, defaults, this.config, {
            readOnly: this.readonly,
            skin: this.skin,
            language: this.language,
            fullPage: this.fullPage,
            inline: this.inline
        });
        this.ckIns = this.inline
            ? CKEDITOR.inline(this.ck.nativeElement, opt)
            : CKEDITOR.replace(this.ck.nativeElement, opt);
        this.ckIns.setData(this.innerValue);
        this.ckIns.on('change', function () {
            var val = _this.ckIns.getData();
            _this.updateValue(val);
        });
        this.ckIns.on('instanceReady', function (evt) {
            _this.ngZone.run(function () {
                _this.ready.emit(evt);
            });
        });
        this.ckIns.on('blur', function (evt) {
            _this.ngZone.run(function () {
                _this.blur.emit(evt);
                _this.propagateTouch();
            });
        });
        this.ckIns.on('focus', function (evt) {
            _this.ngZone.run(function () {
                _this.focus.emit(evt);
            });
        });
    };
    CKEditorComponent.prototype.destroyCKEditor = function () {
        if (this.ckIns) {
            if (CKEDITOR.instances.hasOwnProperty(this.ckIns.name))
                CKEDITOR.remove(CKEDITOR.instances[this.ckIns.name]);
            this.ckIns.destroy();
            this.ckIns = null;
            var editorEl = document.querySelector('#cke_' + this.identifier);
            if (editorEl != null) {
                editorEl.parentElement && editorEl.parentElement.removeChild(editorEl);
            }
        }
    };
    CKEditorComponent.prototype.updateValue = function (value) {
        var _this = this;
        this.ngZone.run(function () {
            _this.innerValue = value;
            _this.propagateChange(value);
            _this.propagateTouch();
            _this.change.emit(value);
        });
    };
    CKEditorComponent.prototype.writeValue = function (value) {
        this.innerValue = value || '';
        if (this.ckIns) {
            // Fix bug that can't emit change event when set non-html tag value twice in fullpage mode.
            this.ckIns.setData(this.innerValue);
            var val = this.ckIns.getData();
            this.ckIns.setData(val);
        }
    };
    CKEditorComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    CKEditorComponent.prototype.registerOnTouched = function (fn) {
        this.propagateTouch = fn;
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
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CKEditorComponent.prototype, "inline", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CKEditorComponent.prototype, "id", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CKEditorComponent.prototype, "change", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CKEditorComponent.prototype, "ready", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CKEditorComponent.prototype, "blur", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CKEditorComponent.prototype, "focus", void 0);
    __decorate([
        core_1.ViewChild('ck'),
        __metadata("design:type", core_1.ElementRef)
    ], CKEditorComponent.prototype, "ck", void 0);
    CKEditorComponent = CKEditorComponent_1 = __decorate([
        core_1.Component({
            selector: 'ck-editor',
            template: "<textarea #ck></textarea>",
            providers: [exports.CKEDITOR_VALUE_ACCESSOR],
            exportAs: 'ckEditor'
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], CKEditorComponent);
    return CKEditorComponent;
    var CKEditorComponent_1;
}());
exports.CKEditorComponent = CKEditorComponent;
//# sourceMappingURL=ck-editor.component.js.map
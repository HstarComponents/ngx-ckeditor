"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ck_editor_component_1 = require("./ck-editor.component");
var CKEditorModule = /** @class */ (function () {
    function CKEditorModule() {
    }
    CKEditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [],
                    exports: [
                        forms_1.FormsModule,
                        ck_editor_component_1.CKEditorComponent
                    ],
                    declarations: [ck_editor_component_1.CKEditorComponent],
                    providers: [],
                },] },
    ];
    /** @nocollapse */
    CKEditorModule.ctorParameters = function () { return []; };
    return CKEditorModule;
}());
exports.CKEditorModule = CKEditorModule;
//# sourceMappingURL=ck-editor.module.js.map
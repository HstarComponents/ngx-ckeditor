"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.editorValue = '';
    }
    AppComponent.prototype.setContent = function () {
        this.editorValue = '<p>1111</p>';
    };
    AppComponent.prototype.getContent = function () {
        alert(this.editorValue);
    };
    AppComponent.prototype.ngOnInit = function () { };
    AppComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app',
                    templateUrl: 'app.component.html'
                },] },
    ];
    /** @nocollapse */
    AppComponent.ctorParameters = function () { return []; };
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
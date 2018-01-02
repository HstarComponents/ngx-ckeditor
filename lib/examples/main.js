"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./vendor");
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app.module");
if (process.env.NODE_ENV === 'production') {
    core_1.enableProdMode();
}
console.log('Running JIT compiled');
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map
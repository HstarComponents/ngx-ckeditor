"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./vendor");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_module_ngfactory_1 = require("../aot/examples/app.module.ngfactory");
core_1.enableProdMode();
console.log('Running AOT compiled');
platform_browser_1.platformBrowser().bootstrapModuleFactory(app_module_ngfactory_1.AppModuleNgFactory);
//# sourceMappingURL=main-aot.js.map
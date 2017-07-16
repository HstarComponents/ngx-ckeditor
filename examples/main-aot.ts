import './vendor';
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/examples/app.module.ngfactory';

console.log('Running AOT compiled');
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

import './vendor';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

console.log('Running JIT compiled');
platformBrowserDynamic().bootstrapModule(AppModule);

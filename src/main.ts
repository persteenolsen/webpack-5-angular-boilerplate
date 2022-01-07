import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Note: Enables Hot Module Replacement declared in Webpack / Dev-server - hot:true !
// For faster developement :-)
declare var module: any;
if (module.hot) {
    module.hot.accept();
} 

platformBrowserDynamic().bootstrapModule(AppModule);

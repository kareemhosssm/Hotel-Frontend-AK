import {
  bootstrapApplication,
  provideClientHydration,
} from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

const originalWarn = console.warn;
console.warn = (...args: any[]) => {
  if (typeof args[0] === 'string' && args[0].includes('NG0913')) {
    return;
  }
  originalWarn(...args);
};

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideClientHydration(),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));

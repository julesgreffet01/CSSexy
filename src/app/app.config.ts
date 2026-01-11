import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './routes/app.routes';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {errorInterceptor} from './core/interceptors/interceptor-error';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptors([errorInterceptor])),
    provideRouter(routes)
  ]
};

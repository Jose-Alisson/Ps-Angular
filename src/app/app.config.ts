import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { Interceptor } from './shared/services/interceptor.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideEnvironmentNgxMask(),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
  ],
};

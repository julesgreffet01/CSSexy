import type { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ServiceAuth } from '../services/service-auth';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const serviceAuth = inject(ServiceAuth)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      switch (error.status) {
        case 401:
          serviceAuth.logout() //peut etre que la redirection ne vas pas fonctionner a tester
          break;

        case 403:
          router.createUrlTree(['/error-403']);
          break;

        case 500:
          router.createUrlTree(['/error-500']);
          break;
      }

      return throwError(() => error);
    })
  );
};

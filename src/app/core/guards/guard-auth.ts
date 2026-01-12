import {type CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {ServiceAuth} from '../services/service-auth';
import {catchError, map, of} from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(ServiceAuth);
  const router = inject(Router);

  return authService.getUser().pipe(
    map(user => {
      if (user) {
        return true;
      }

      return router.createUrlTree(['/login']);
    }),
    catchError(() => of(router.createUrlTree(['/login'])))
  );
};

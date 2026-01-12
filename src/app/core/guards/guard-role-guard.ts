import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {ServiceAuth} from '../services/service-auth';
import {map} from 'rxjs';

export const guardRoleGuard: CanActivateFn = (route) => {
  const authService = inject(ServiceAuth)
  const router = inject(Router)

  const allowedRoles = route.data['roles'] as Array<'ADMIN' | 'DEV' | 'DEV_OPS'>;
  return authService.getUser().pipe(
    map(user =>
      allowedRoles.includes(user.role)
        ? true
        : router.createUrlTree(['/error-403'])
    )
  );
};

import type {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {ServiceAuth} from '../services/service-auth';

export const interceptorToken: HttpInterceptorFn = (req, next) => {

  const authService = inject(ServiceAuth)
  const token = authService.getToken()

  if (!token) {
    return next(req)
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  )
}

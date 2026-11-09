import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  
  const platformId = inject(PLATFORM_ID);

  //logic REQ ---> send HEADERS

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('userToken');

  if (token) {
    req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
   })
    }
  }
    
  return next(req);//logic RES

};

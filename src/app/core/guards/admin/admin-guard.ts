import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const id = inject(PLATFORM_ID);

  

  if (isPlatformBrowser(id)) {
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('userRole');
    if (token && role === 'Admin') {
    return true;
    }else {
    // Navigate to home page
    router.navigate(['/home']);
    return false;
    }
  }
  return true;
  
  
};

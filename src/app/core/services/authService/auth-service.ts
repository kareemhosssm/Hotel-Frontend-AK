import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import {jwtDecode} from 'jwt-decode';

export interface resetPass{
   email: string;
   token: string;
   newPassword: string
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
    
    private readonly httpClient = inject(HttpClient);
    private readonly router = inject(Router);

    
   userData: any = null;
   
   sendRegisterForm(data: object):Observable<any>
   {
      return this.httpClient.post(`${environment.baseUrl}/api/Auth/register`, data, { responseType: 'text' }); 
   }

   sendLoginForm(data: object):Observable<any>
     {
        return this.httpClient.post(`${environment.baseUrl}/api/Auth/login`, data); 
   }

   saveUserData(): void{
      if ( localStorage.getItem('userToken') !== null) { 
         this.userData = jwtDecode(localStorage.getItem('userToken')!);
         const userRole = this.userData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
         localStorage.setItem('userRole', userRole);
         console.log('userData' , this.userData)
      }
   }

   getUserIdFromToken(): string | null {
  const token = localStorage.getItem('userToken');
  if (!token) return null;

  const decoded: any = jwtDecode(token); 
  return decoded.uid || decoded.sub;     
}

   logOUt(): void {
      localStorage.removeItem('userToken');
      this.userData = null;
      // navigate login
      this.router.navigate(['/login']);
   }
   
   forgotPassword(data: { email: string }): Observable<any>
   {
      return this.httpClient.post(`${environment.baseUrl}/api/Auth/forgot-password`, data, { responseType: 'text' });
   }


   resetPassword(data: resetPass): Observable<any>
   {
     return this.httpClient.post(`${environment.baseUrl}/api/Auth/reset-password`, data,  { responseType: 'text' });
   }
   }


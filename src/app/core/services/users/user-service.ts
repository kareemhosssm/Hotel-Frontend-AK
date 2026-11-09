import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);

getAllUsers(): Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/User/GetAll`);
  }
deleteUser(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/User/DeleteUser/${id}`);
  }
updateUser(id: string, data: object): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/User/UpdateUser/${id}`, data);
  }
addUser(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/User/AddUser`,data);
  }
}

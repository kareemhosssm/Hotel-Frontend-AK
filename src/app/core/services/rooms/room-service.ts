import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
  
export class RoomService {
  private readonly httpClient = inject(HttpClient);

  getAllRooms(): Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/Room/GetAll`);
  }
  
  getRoomById(roomId: number): Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/Room/GetRoomById/${roomId}`);
  }

  // from Admin
  Addroom(data: object): Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/api/Room/CreateRoom`,data);
  }

  deleteRoom(id: number): Observable<any>
  {
    return this.httpClient.delete(`${environment.baseUrl}/api/Room/DeleteRoom/${id}`);
  }

  updateRoom(id: number, data: object): Observable<any>
  {
    return this.httpClient.put(`${environment.baseUrl}/api/Room/UpdateRoom/${id}`, data);
  }
  
}

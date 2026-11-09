import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IBookingRequest } from '../../../shared/interfaces/ibooking-request';
import { environment } from '../../environments/environment';
import { IUpdateBooking } from '../../../shared/interfaces/iupdate-booking';

@Injectable({
  providedIn: 'root',
})
export class BookingService {

  private readonly httpClient = inject(HttpClient);


  CreateBookingForUser(data: IBookingRequest): Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/api/Booking`, data);
  }

  getBookingsByRoomId(roomId: number): Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/Booking/room/${roomId}`);
  }
  
  getAllBookingUser(): Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/Booking`);
  }

  getBookingById(bookingId : number): Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/Booking/room/${bookingId}`);
  }
  
  updateBookingsByBookingId(bookingId: number , data :IUpdateBooking): Observable<any>
  {
    return this.httpClient.put(`${environment.baseUrl}/api/Booking/${bookingId}` , data,{ responseType: 'text' });
  }
  
  deleteBookingsByRoomId(roomId: number): Observable<any>
  {
    return this.httpClient.delete(`${environment.baseUrl}/api/Booking/${roomId}`,{ responseType: 'text' });
  }

  deleteAllBookingsForUser(): Observable<any>
  {
    return this.httpClient.delete(`${environment.baseUrl}/api/Booking/AllForUser`);
  }
  
  // For Admin

  getBookingStats(): Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/Booking/admin/stats`);
  }

  getAllLatestBookingsAdmin(): Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/Booking/admin/AllLatestBooking`);

  }

  getAllBookingAdmin(): Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/Booking/admin/all`)
  }

  updateStatus(id: number, status: string) {
  
  return this.httpClient.put(`${environment.baseUrl}/api/Booking/admin/status/${id}`, 
    JSON.stringify(status), 
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
      responseType: 'text' 
    }
  );
}

createCheckoutSession(body: any) {
  return this.httpClient.post(`${environment.baseUrl}/api/Payment/create-checkout-session`, body
  );
}
}

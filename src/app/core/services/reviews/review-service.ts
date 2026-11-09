import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  
  private readonly httpClient = inject(HttpClient);

  
  
  createOrUpdateReview(data : object):Observable<any>
  {
     return this.httpClient.post(`${environment.baseUrl}/api/Review/CreateOrUpdate`, data); 
  }
  
  getReviewById(traceId : number):Observable<any>
  {
     return this.httpClient.get(`${environment.baseUrl}/api/Review/getById/${traceId}`); 
  }
   
  // for Admin
  getAllReviews() : Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/Review/getAll`)
  }

   getAllRooms(): Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/Room/GetAll`);
  }
  deleteReview(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/Review/Delete/${id}`);
  }

}

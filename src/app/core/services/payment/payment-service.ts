import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly httpClient = inject(HttpClient);


checkoutPayment(data:object): Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/api/Payment/create-checkout-session`, data);
  }
}

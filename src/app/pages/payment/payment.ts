import { Component, inject, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/payment/payment-service';
import { BookingService } from '../../core/services/bookingService/booking-service';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment implements OnInit {
  private readonly paymentService = inject(PaymentService);
  private readonly bookingService = inject(BookingService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  bookingId!: number;
  bookingDetails: any;

  ngOnInit(): void {
    this.getBookingId();
  }

  getBookingId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.bookingId = +param.get('bookingId')!;
        this.getBooking();
      },
    });
  }

  getBooking(): void {
    this.bookingService.getBookingById(this.bookingId).subscribe({
      next: (res) => {
        this.bookingDetails = res;
        console.log(this.bookingDetails);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onPay() {
    if (!this.bookingDetails) return;

    const paymentData = {
      bookingId: this.bookingId,
      hotelName: this.bookingDetails.roomName,
      price: this.bookingDetails.price,
      successUrl: window.location.origin + '/payment-success',
      cancelUrl: window.location.origin + '/payment-cancel',
    };

    this.paymentService.checkoutPayment(paymentData).subscribe({
      next: (res: any) => {
        window.open(res.url, '_blank');
      },
      error: (err) => console.error(err),
    });
  }
}

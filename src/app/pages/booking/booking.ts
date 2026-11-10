import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  isPlatformBrowser,
} from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/authService/auth-service';
import { BookingService } from '../../core/services/bookingService/booking-service';
import { PaymentService } from '../../core/services/payment/payment-service';
import { IgetAllBooking } from '../../shared/interfaces/iget-all-booking';
import { environment } from '../../core/environments/environment';

export interface IBookingRange {
  checkInDate: string;
  checkOutDate: string;
  status: string;
  bookingId?: number;
  roomId: number;
}

@Component({
  selector: 'app-booking',
  imports: [DatePipe, CurrencyPipe, CommonModule],
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class Booking implements OnInit {
  private readonly bookingService = inject(BookingService);
  private readonly paymentService = inject(PaymentService);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  baseUrl = environment.baseUrl;

  bookingList: IgetAllBooking[] = [];
  userId: string | null = null;
  payingId: number | string | null = null;

  navigateToRooms(): void {
    this.router.navigate(['/rooms']);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = this.authService.getUserIdFromToken();
      if (this.userId) {
        this.getAllBookingsForUser(this.userId);
      }
    }
  }

  getAllBookingsForUser(userId: string): void {
    this.bookingService.getAllBookingUser().subscribe({
      next: (res: IgetAllBooking[]) => {
        this.bookingList = res.filter(
          (b: IgetAllBooking) => b.userId === userId,
        );
        console.log('User bookings:', this.bookingList);
      },
      error: (err) => console.error(err),
    });
  }

  onPay(booking: IgetAllBooking): void {
    if (this.payingId) return;

    const b = booking as any;
    const totalPrice = this.getTotalPrice(
      booking.checkInDate,
      booking.checkOutDate,
      b.room?.pricePerNight || b.pricePerNight || 100,
    );

    if (!totalPrice || totalPrice <= 0) {
      this.toastrService.error('Booking price is invalid', 'Error');
      return;
    }

    this.payingId = b.bookingId;

    const paymentData = {
      BookingId: Number(b.bookingId),
      HotelName:
        b.room?.roomType ??
        b.roomType ??
        b.roomName ??
        b.room?.type ??
        'Hotel Room',
      Price: Number(totalPrice),
      SuccessUrl: window.location.origin + '/payment-success',
      CancelUrl: window.location.origin + '/payment-cancel',
    };

    console.log('sent payment data =', paymentData);

    this.paymentService.checkoutPayment(paymentData).subscribe({
      next: (res: any) => {
        console.log('checkout response =', res);
        const url = typeof res === 'string' ? res : res?.url;
        if (url) {
          window.location.href = url;
        } else {
          this.payingId = null;
          this.toastrService.error('No payment link returned', 'Error');
        }
      },
      error: (err) => {
        console.error('checkout error =', err.error);
        this.payingId = null;
        this.toastrService.error('Payment could not be started', 'Error');
      },
    });
  }

  getTotalPrice(
    checkInDate: Date,
    checkOutDate: Date,
    pricePerNight: number,
  ): number {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays * pricePerNight : pricePerNight;
  }

  removeBooking(roomId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookingService.deleteBookingsByRoomId(roomId).subscribe({
          next: (res) => {
            this.toastrService.success(
              'Booking Deleted Successfully',
              'Success',
            );
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
            if (this.userId) {
              this.getAllBookingsForUser(this.userId);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  deleteAllBookings(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookingService.deleteAllBookingsForUser().subscribe({
          next: (res) => {
            this.toastrService.success(
              'AllBooking Deleted Successfully',
              'Success',
            );
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
            if (this.userId) {
              this.getAllBookingsForUser(this.userId);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  getStatusClass(status: string): string {
    const baseClass = 'text-slate-700 font-bold p-1 rounded-md';
    switch (status) {
      case 'Pending':
        return `bg-orange-500 ${baseClass}`;
      case 'Cancelled':
        return `bg-red-500 ${baseClass}`;
      case 'Confirmed':
        return `bg-green-500 ${baseClass}`;
      default:
        return `bg-gray-300 ${baseClass}`;
    }
  }

  startUpdate(booking: IgetAllBooking): void {
    this.router.navigate(['/details', booking.roomId], {
      queryParams: {
        bookingId: booking.bookingId,
        checkIn: booking.checkInDate,
        checkOut: booking.checkOutDate,
        mode: 'update',
      },
    });
  }
}

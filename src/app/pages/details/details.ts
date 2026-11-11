import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../core/services/bookingService/booking-service';
import { RoomService } from '../../core/services/rooms/room-service';
import { IRoom } from '../../shared/interfaces/iroom';
import { ToastrService } from 'ngx-toastr';
import { IUpdateBooking } from '../../shared/interfaces/iupdate-booking';
import { IBookingRequest } from '../../shared/interfaces/ibooking-request';
import { CurrencyPipe } from '@angular/common';
import { environment } from '../../core/environments/environment';

interface IBookingRange {
  checkInDate: string;
  checkOutDate: string;
  status: string;
  bookingId?: number;
  roomId: number;
}

@Component({
  selector: 'app-details',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {
  private readonly roomService = inject(RoomService);
  private readonly bookingService = inject(BookingService);
  private readonly toastrService = inject(ToastrService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  baseUrl = environment.baseUrl;

  room!: IRoom;
  selectedImage!: string;

  minDate: string = '';
  bookedRanges: IBookingRange[] = [];
  bookedData = {} as IUpdateBooking;

  checkInDate!: string;
  checkOutDate!: string;
  roomId!: number;
  currentBookingId?: number;

  ngOnInit(): void {
    const roomId = Number(this.route.snapshot.paramMap.get('roomId'));

    if (roomId) {
      this.roomId = roomId;
      this.getRoomDetails(roomId);
      this.getRoomBookings(roomId);
    }

    this.route.queryParams.subscribe((params) => {
      if (params['mode'] === 'update') {
        this.currentBookingId = +params['bookingId'];
        this.checkInDate = params['checkIn'].split('T')[0];
        this.checkOutDate = params['checkOut'].split('T')[0];
      }
    });

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  changeImage(img: string) {
    this.selectedImage = img;
  }

  getRoomDetails(roomId: number) {
    this.roomService.getRoomById(roomId).subscribe({
      next: (res: IRoom) => {
        this.room = res;
        this.selectedImage = this.room.images[0];
      },
      error: (err: any) => {
        console.error(err);
        this.toastrService.error('Failed to load room details', 'Error');
      },
    });
  }

  getRoomBookings(roomId: number) {
    this.bookingService.getBookingsByRoomId(roomId).subscribe(
      (res: IBookingRange[]) => {
        this.bookedRanges = res
          .filter((b) => b.status?.toLowerCase() !== 'cancelled')
          .map((b) => ({
            checkInDate: b.checkInDate.split('T')[0],
            checkOutDate: b.checkOutDate.split('T')[0],
            status: b.status,
            roomId: b.roomId,
            bookingId: b.bookingId,
          }));
      },
      (err: any) => {
        console.error(err);
      },
    );
  }

  hasDateConflict(startStr: string, endStr: string): boolean {
    const start = new Date(startStr);
    const end = new Date(endStr);

    return this.bookedRanges.some((b) => {
      if (b.bookingId === this.currentBookingId) return false;
      const bStart = new Date(b.checkInDate);
      const bEnd = new Date(b.checkOutDate);
      return start < bEnd && end > bStart;
    });
  }

  bookOrUpdate(): void {
    // Check if user is logged in
    const token = localStorage.getItem('userToken');

    if (!token && !this.currentBookingId) {
      this.toastrService.warning(
        'Please login first to complete your booking',
        'Login Required',
      );

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2500);

      return;
    }

    if (!this.checkInDate || !this.checkOutDate) {
      this.toastrService.error(
        'Please select check-in and check-out dates',
        'Error',
      );
      return;
    }

    if (this.checkOutDate <= this.checkInDate) {
      this.toastrService.error('Check-out must be after check-in', 'Error');
      return;
    }

    if (this.hasDateConflict(this.checkInDate, this.checkOutDate)) {
      this.toastrService.error('Selected dates are already booked', 'Error');
      return;
    }

    const updatedata: IUpdateBooking = {
      checkInDate: new Date(this.checkInDate),
      checkOutDate: new Date(this.checkOutDate),
      roomId: this.roomId,
    };

    const createdata: IBookingRequest = {
      roomId: this.roomId,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
    };

    if (this.currentBookingId) {
      this.bookingService
        .updateBookingsByBookingId(this.currentBookingId, updatedata)
        .subscribe({
          next: () => {
            this.toastrService.success(
              'Booking Updated Successfully',
              'Success',
            );
            this.router.navigate(['/booking']);
          },
          error: (err) => {
            this.toastrService.error(err.error || 'Update failed', 'Error');
            console.error(err);
          },
        });
    } else {
      this.bookingService.CreateBookingForUser(createdata).subscribe({
        next: () => {
          this.toastrService.success('Booking successful', 'Success');
          this.router.navigate(['/booking']);
        },
        error: (err) => {
          this.toastrService.error(err.error || 'Booking failed', 'Error');
          console.error(err);
        },
      });
    }
  }
}

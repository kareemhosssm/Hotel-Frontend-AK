import { Component, inject } from '@angular/core';
import { BookingService } from '../../core/services/bookingService/booking-service';
import { IAllBookingAdmin } from '../../shared/interfaces/IAllBookingAdmin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-bookings',
  imports: [CommonModule],
  templateUrl: './admin-bookings.html',
  styleUrls: ['./admin-bookings.scss'], 
  standalone: true
})
export class AdminBookings {
  private bookingService = inject(BookingService);

  allbooking: IAllBookingAdmin[] = [];
  
  // Pagination variables
  pageSize = 5;
  currentPage = 1;
  totalPages = 1;

  ngOnInit(): void {
    this.getAllBookingAdmin();
  }

  getAllBookingAdmin() {
    this.bookingService.getAllBookingAdmin().subscribe({
      next: (res) => {
        console.log(res);
        this.allbooking = res;
        this.totalPages = Math.ceil(this.allbooking.length / this.pageSize);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

 
  get pagedBookings() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.allbooking.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  updateBookingStatus(id: number, newStatus: string) {
    this.bookingService.updateStatus(id, newStatus).subscribe({
      next: (res) => {
        const booking = this.allbooking.find(b => b.bookingId === id);
        if (booking) {
          booking.status = newStatus;
        }
        alert('Done');
      },
      error: (err) => {
        console.error('Error updating booking status:', err);
      }
    });
  }
}
import { Component, inject } from '@angular/core';
import { RoomService } from '../../core/services/rooms/room-service';
import { IRoom } from '../../shared/interfaces/iroom';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-admin-rooms',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-rooms.html',
  styleUrl: './admin-rooms.scss',
})
export class AdminRooms {

  private roomService= inject(RoomService);
  allRoom:IRoom[]=[];

    // Pagination variables
  pageSize = 5;
  currentPage = 1;
  totalPages = 1;


 ngOnInit(): void { 
    this.getallRooms();
  }



  getallRooms(){
    this.roomService.getAllRooms().subscribe(
      {
        next: (data) => {
          this.allRoom = data;
          console.log(this.allRoom);
          this.totalPages = Math.ceil(this.allRoom.length / this.pageSize);
        },
        error: (err) => {
          console.log(err);
        },
      }
    );}

    deleteRoom(id: number) {
      this.roomService.deleteRoom(id).subscribe({
        next: (res) => {
          alert('Room deleted successfully');
          this.getallRooms();
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }


    get pagedBookings() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.allRoom.slice(start, start + this.pageSize);
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

}
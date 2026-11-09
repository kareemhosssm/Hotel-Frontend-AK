import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../../core/services/rooms/room-service';
import { IRoom } from '../../shared/interfaces/iroom';
import { CurrencyPipe, NgClass } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/searchPipe';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-rooms',
  imports: [FormsModule, CurrencyPipe, SearchPipe, RouterLink, NgClass],
  templateUrl: './rooms.html',
  styleUrl: './rooms.scss',
})
export class Rooms {
  private readonly roomService = inject(RoomService);
    private readonly router = inject(Router);

  
  text: string = '';
  RoomsList: IRoom[] = [];

  getRoomsData(): void{
    this.roomService.getAllRooms().subscribe({
      next: (res) => {
        console.log(res);
        this.RoomsList = res;
      },  
      error: (err) => {
        console.log(err);
      }
   })
  }
  getByID(roomId: number) {
         this.router.navigate(['/details', roomId]);
        
      
  }

  ngOnInit(): void {
    this.getRoomsData();
  }

}

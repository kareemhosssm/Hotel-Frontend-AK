import { CurrencyPipe, isPlatformBrowser, NgClass } from '@angular/common';
import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RoomService } from '../../core/services/rooms/room-service';
import { IRoom } from '../../shared/interfaces/iroom';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe, RouterLink, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  

  private readonly roomService = inject(RoomService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);



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
  // داخل الـ class
images: string[] = [
  '/images/image_1.jpg',
  '/images/image_2.jpg', 
  '/images/image_3.jpg',
  '/images/image_4.jpg',
];

currentIndex: number = 0;
  intervalId: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  startSlider() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 5000);
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  // أهم خطوة: بنمسح التايمر لما نمشي من الصفحة عشان ميفضلش شغال في الخلفية ويهنج المتصفح
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }






  ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)) {
      this.startSlider();
    }
    this.getRoomsData();
  }

}

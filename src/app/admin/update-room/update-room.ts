import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../core/services/rooms/room-service';
import { IRoom } from '../../shared/interfaces/iroom';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.html',
  imports: [ReactiveFormsModule, NgClass],
  styleUrls: ['./update-room.scss']
})
export class UpdateRoomComponent implements OnInit {

  updateRoomForm: FormGroup;
  selectedFiles: File[] = [];
  roomId!: number;
  roomData!: IRoom;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateRoomForm = this.fb.group({
      number: ['', Validators.required],
      type: ['', Validators.required],
      pricePerNight: [0, Validators.required],
      isAvailable: [true],
      description: [''],
      images: [null]
    });
  }

  ngOnInit(): void {
    // جلب الـ roomId من الروتر
    this.roomId = +this.route.snapshot.paramMap.get('id')!;
    this.loadRoom();
  }

  loadRoom() {
    this.roomService.getRoomById(this.roomId).subscribe({
      next: (data) => {
        this.roomData = data;
        // تعبي الفورم بالقيم الحالية
        this.updateRoomForm.patchValue({
          number: data.number,
          type: data.type,
          pricePerNight: data.pricePerNight,
          isAvailable: data.isAvailable,
          description: data.description
        });
      },
      error: (err) => console.error(err)
    });
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  submit() {
    const formData = new FormData();
    formData.append('Number', this.updateRoomForm.value.number);
    formData.append('Type', this.updateRoomForm.value.type);
    formData.append('PricePerNight', this.updateRoomForm.value.pricePerNight);
    formData.append('IsAvailable', this.updateRoomForm.value.isAvailable);
    formData.append('Description', this.updateRoomForm.value.description);

    this.selectedFiles.forEach(file => formData.append('Images', file));

    this.roomService.updateRoom(this.roomId, formData).subscribe({
      next: () => {
        alert('Room updated successfully!');
        this.router.navigate(['/admin/rooms']); // الرجوع لصفحة الغرف بعد التحديث
      },
      error: (err) => console.error(err)
    });
  }
}

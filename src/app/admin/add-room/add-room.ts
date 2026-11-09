import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoomService } from '../../core/services/rooms/room-service';


@Component({
  selector: 'app-add-room',
  standalone: true, // مهم لو شغال أنجولار حديث
  imports: [ReactiveFormsModule],
  templateUrl: './add-room.html'
})
export class AddRoom {
  roomForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder, private roomService: RoomService) {
    this.roomForm = this.fb.group({
      number: [''],
      type: [''],
      pricePerNight: [0],
      isAvailable: [true],
      description: ['']
    });
  }

  // فنكشن عشان تلقط الصور لما تختارها
  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit() {
    const formData = new FormData();
    
    // 1. إضافة الحقول العادية
    Object.keys(this.roomForm.value).forEach(key => {
      formData.append(key, this.roomForm.value[key]);
    });

    // 2. إضافة الصور
    this.selectedFiles.forEach(file => {
      formData.append('Images', file); // لازم الاسم "Images" يطابق الـ DTO في الباك اند
    });

    this.roomService.Addroom(formData).subscribe({
      next: (res) => alert(`Done`),
      error: (err) => console.error("Error adding room:", err)
    });
  }
}
import { Component, inject } from '@angular/core';
import { IAllUsers } from '../../shared/interfaces/IAllUserAdmin';
import { UserService } from '../../core/services/users/user-service';
import { NgClass, NgForOf } from '@angular/common';


@Component({
  selector: 'app-admin-users',
  imports: [NgClass, NgForOf],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss',
})
export class AdminUsers {
  AllUsser: IAllUsers[] = [];
  // Pagination variables
  pageSize = 5;
  currentPage = 1;
  totalPages = 1;
  private userservice = inject(UserService);
  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userservice.getAllUsers().subscribe({
      next: (res) => {
        this.AllUsser = res;
        this.totalPages = Math.ceil(this.AllUsser.length / this.pageSize);
        },
      error: (err) => console.log(err)
    })
  }

  get pagedBookings() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.AllUsser.slice(start, start + this.pageSize);
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

  deleteUser(id: string){
    this.userservice.deleteUser(id).subscribe({
      next: (res) => {
        alert('User deleted successfully');
        this.getAllUsers();
        console.log(res);
      },
      error: (err) => {
        console.log(err); 
      },
    }

      
    )
  }
}
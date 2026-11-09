import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  isOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  closeOnMobile() {
    if (window.innerWidth <= 768) {
      this.isOpen = false;
    }
  }
}

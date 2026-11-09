import { Component, inject, input, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/authService/auth-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  readonly authService = inject(AuthService);
  private readonly id = inject(PLATFORM_ID);

  isLogin = input<boolean>(true);
  isAdmin = false;
  isGuest = false;

  isMobileMenuOpen = false;

  ngOnInit() {
    if (isPlatformBrowser(this.id)) {
      const role = localStorage.getItem('userRole');
      this.isAdmin = role === 'Admin';
      this.isGuest = !localStorage.getItem('userToken');
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}

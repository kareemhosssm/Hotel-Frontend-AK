import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

type Tab = 'hotel' | 'notifications' | 'security' | 'account';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const np = group.get('newPassword')?.value;
  const cp = group.get('confirmPassword')?.value;
  return np && cp && np !== cp ? { mismatch: true } : null;
}

@Component({
  selector: 'app-admin-setting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-setting.html',
})
export class AdminSetting implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly toastr = inject(ToastrService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly HOTEL_KEY = 'adminHotelSettings';
  private readonly NOTIF_KEY = 'adminNotifSettings';

  activeTab: Tab = 'hotel';
  showPasswords = false;

  tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'hotel', label: 'Hotel Info', icon: 'fa-hotel' },
    { id: 'notifications', label: 'Notifications', icon: 'fa-bell' },
    { id: 'security', label: 'Security', icon: 'fa-lock' },
    { id: 'account', label: 'Account', icon: 'fa-user-shield' },
  ];

  hotelForm = this.fb.nonNullable.group({
    name: ['Hotel Admin', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^[0-9+\-\s()]{7,20}$/)]],
    address: [''],
    checkInTime: ['14:00', Validators.required],
    checkOutTime: ['12:00', Validators.required],
    currency: ['USD', Validators.required],
    taxRate: [0, [Validators.min(0), Validators.max(100)]],
  });

  notifForm = this.fb.nonNullable.group({
    newBooking: [true],
    cancellation: [true],
    newReview: [false],
    newUser: [false],
    weeklyReport: [true],
  });

  passwordForm = this.fb.nonNullable.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatch },
  );

  notifItems = [
    {
      key: 'newBooking',
      title: 'New bookings',
      desc: 'Get notified when a guest makes a reservation.',
    },
    {
      key: 'cancellation',
      title: 'Cancellations',
      desc: 'Get notified when a booking is cancelled.',
    },
    {
      key: 'newReview',
      title: 'New reviews',
      desc: 'Get notified when a guest leaves feedback.',
    },
    {
      key: 'newUser',
      title: 'New users',
      desc: 'Get notified when a new account is registered.',
    },
    {
      key: 'weeklyReport',
      title: 'Weekly report',
      desc: 'Receive a summary of bookings and revenue every week.',
    },
  ] as const;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.load(this.HOTEL_KEY, this.hotelForm);
    this.load(this.NOTIF_KEY, this.notifForm);
  }

  private load(key: string, form: { patchValue: (v: any) => void }) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) form.patchValue(JSON.parse(raw));
    } catch {
      /* ignore corrupted data */
    }
  }

  private save(key: string, value: unknown) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  saveHotel() {
    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      return;
    }
    // TODO: استبدلها باستدعاء الـ API لما يبقى جاهز
    this.save(this.HOTEL_KEY, this.hotelForm.getRawValue());
    this.toastr.success('Hotel settings saved');
  }

  saveNotifications() {
    // TODO: استبدلها باستدعاء الـ API لما يبقى جاهز
    this.save(this.NOTIF_KEY, this.notifForm.getRawValue());
    this.toastr.success('Notification preferences saved');
  }

  changePassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    // TODO: نده على endpoint تغيير الباسورد من الـ AuthService
    // this.authService.changePassword(this.passwordForm.getRawValue()).subscribe({...})
    this.toastr.info('Connect this form to your change-password endpoint');
    this.passwordForm.reset();
  }

  invalid(form: AbstractControl, name: string): boolean {
    const c = form.get(name);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userToken');
      window.location.href = '/home';
    }
  }
}

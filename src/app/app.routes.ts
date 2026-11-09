import { Routes } from '@angular/router';
import { logedGuard } from './core/guards/loged-guard';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin/admin-guard';
import { UpdateRoomComponent } from './admin/update-room/update-room';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  // Admin Layout
  {
    path: 'admin',
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout').then((c) => c.AdminLayout),
    canActivate: [adminGuard],
    title: 'AdminDashboard',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then((c) => c.Dashboard),
        title: 'AdminDashboard',
      },
      {
        path: 'bookings',
        loadComponent: () =>
          import('./pages/admin-bookings/admin-bookings').then(
            (c) => c.AdminBookings,
          ),
        title: 'AdminBookings',
      },
      {
        path: 'rooms',
        loadComponent: () =>
          import('./pages/admin-rooms/admin-rooms').then((c) => c.AdminRooms),
        title: 'AdminRooms',
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./admin/add-room/add-room').then((c) => c.AddRoom),
        title: 'Add New Room',
      },
      { path: 'rooms/update/:id', component: UpdateRoomComponent },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/admin-users/admin-users').then((c) => c.AdminUsers),
        title: 'AdminUsers',
      },
      {
        path: 'reviews',
        loadComponent: () =>
          import('./pages/admin-reviews/admin-reviews').then(
            (c) => c.AdminReviews,
          ),
        title: 'AdminReviews',
      },
      {
        path: 'setting',
        loadComponent: () =>
          import('./pages/admin-setting/admin-setting').then(
            (c) => c.AdminSetting,
          ),
        title: 'AdminSetting',
      },
    ],
  },

  // Auth Layout
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout').then((c) => c.AuthLayout),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then((c) => c.Login),
        canActivate: [logedGuard],
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register').then((c) => c.Register),
        canActivate: [logedGuard],
        title: 'Register',
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./shared/components/forgot-password/forgot-password').then(
            (m) => m.ForgotPassword,
          ),
        title: 'forgotPassword',
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./shared/components/reset-password/reset-password').then(
            (m) => m.ResetPassword,
          ),
        title: 'resetPassword',
      },
    ],
  },

  // Blank Layout
  {
    path: '',
    loadComponent: () =>
      import('./layouts/blank-layout/blank-layout').then((c) => c.BlankLayout),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then((c) => c.Home),
        title: 'Home',
      },
      {
        path: 'booking',
        loadComponent: () =>
          import('./pages/booking/booking').then((c) => c.Booking),
        canActivate: [authGuard],
        title: 'Booking',
      },
      {
        path: 'payment/:bookingId',
        loadComponent: () =>
          import('./pages/payment/payment').then((c) => c.Payment),
        canActivate: [authGuard],
        title: 'Payment',
      },
      {
        path: 'connectUs',
        loadComponent: () =>
          import('./pages/connect-us/connect-us').then((c) => c.ConnectUs),
        title: 'Connect Us',
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about').then((c) => c.About),
        title: 'About',
      },
      {
        path: 'rooms',
        loadComponent: () => import('./pages/rooms/rooms').then((c) => c.Rooms),
        title: 'Rooms',
      },
      {
        path: 'details/:roomId',
        loadComponent: () =>
          import('./pages/details/details').then((c) => c.Details),
        title: 'Details',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found/not-found').then((c) => c.NotFound),
        title: 'Not Found',
      },
    ],
  },
];

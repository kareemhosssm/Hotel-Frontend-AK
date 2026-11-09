import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'admin/rooms/update/:id', renderMode: RenderMode.Client },
  { path: 'admin/**', renderMode: RenderMode.Server },
  { path: 'details/:roomId', renderMode: RenderMode.Client },
  { path: 'payment/:bookingId', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender },
];

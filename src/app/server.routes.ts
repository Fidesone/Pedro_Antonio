// src/app/server-routes.ts
import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'modificar-libro/:id',
    renderMode: RenderMode.Server // 👈 SSR, no prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

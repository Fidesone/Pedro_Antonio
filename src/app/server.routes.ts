import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'modificar-libro',
    renderMode: RenderMode.Server // ← ya no tiene :id
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

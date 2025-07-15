import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'register', renderMode: RenderMode.Prerender },
  { path: 'login', renderMode: RenderMode.Prerender },
  { path: 'articulos', renderMode: RenderMode.Prerender },
  { path: 'libros', renderMode: RenderMode.Prerender },
  { path: 'biografia', renderMode: RenderMode.Prerender },
  { path: 'nuevo-articulo', renderMode: RenderMode.Prerender },
  { path: 'nuevo-libro', renderMode: RenderMode.Prerender }

];



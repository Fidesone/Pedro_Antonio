import { Routes } from '@angular/router';
import { ModificarLibroComponent } from './modificar-libro.component';
const isPrerender = process.env['PRERENDER'] === 'true';

console.log('📦 Cargando rutas de modificar-libro');
export const routes: Routes = [
  isPrerender
    ? [] // ⚠️ Eliminamos la ruta temporalmente para prerender
    : [
        {
          path: ':id',
          component: ModificarLibroComponent
        }
      ]
].flat();

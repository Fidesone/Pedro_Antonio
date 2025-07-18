import { Routes } from '@angular/router';
import { ModificarArticuloComponent } from './modificar-articulo.component';

console.log('📰 Cargando rutas de modificar-articulo');

export const routes: Routes = [
  {
    path: '', // No usamos ':id' en la ruta base, el ID llega por queryParams
    component: ModificarArticuloComponent
  }
];

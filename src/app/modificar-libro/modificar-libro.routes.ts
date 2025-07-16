import { Routes } from '@angular/router';
import { ModificarLibroComponent } from './modificar-libro.component';

export const routes: Routes = [
  {
    path: ':id',
    component: ModificarLibroComponent
  }
];

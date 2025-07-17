import { Routes } from '@angular/router';
import { ModificarLibroComponent } from './modificar-libro.component';



console.log('📦 Cargando rutas de modificar-libro');

export const routes: Routes = [


        {
          path: '', // ← ya no usamos ':id'
          component: ModificarLibroComponent
        }
      ];


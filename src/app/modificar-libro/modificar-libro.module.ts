import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './modificar-libro.routes';


@NgModule({
  imports: [
    RouterModule.forChild(routes) // 👈 Aquí se importa la ruta
  ]
})
export class ModificarLibroModule {}

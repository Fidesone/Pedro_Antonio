import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './modificar-libro.routes';

console.log('📦 Importando RouterModule en ModificarLibroModule');
@NgModule({
  imports: [
    RouterModule.forChild(routes) // 👈 Aquí se importa la ruta
  ]
})
export class ModificarLibroModule {}

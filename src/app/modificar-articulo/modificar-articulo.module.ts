import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './modificar-articulo.routes';

console.log('📰 Importando RouterModule en ModificarArticuloModule');

@NgModule({
  imports: [
    RouterModule.forChild(routes) // 👈 Se importa la ruta del componente
  ]
})
export class ModificarArticuloModule {}

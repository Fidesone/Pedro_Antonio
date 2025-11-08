import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { LibrosComponent } from './libros/libros.component';
import { BiografiaComponent } from './biografia/biografia.component';
import { NuevoArticuloComponent } from './nuevo-articulo/nuevo-articulo.component';
import { NuevoLibroComponent } from './nuevo-libro/nuevo-libro.component';
import { ModificarLibroComponent } from './modificar-libro/modificar-libro.component';
import { ContactoComponent } from './contacto/contacto.component';
import { EntrevistasComponent } from './entrevistas/entrevistas.component';

export const routes: Routes = [
   { path: '', component: MainComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'login', component: LoginComponent },
   { path: 'articulos', component: ArticulosComponent },
   { path: 'libros', component: LibrosComponent }, 
   { path: 'biografia', component: BiografiaComponent },
   { path: 'nuevo-articulo', component: NuevoArticuloComponent },
   { path: 'nuevo-libro', component: NuevoLibroComponent },
   { path: 'contacto', component: ContactoComponent },
  { path: 'entrevistas', component: EntrevistasComponent },
   {
     path: 'modificar-libro',
     loadChildren: () =>
      import('./modificar-libro/modificar-libro.module').then(m => m.ModificarLibroModule)
    },
    {
    path: 'modificar-articulo',
    loadChildren: () =>
      import('./modificar-articulo/modificar-articulo.module').then(m => m.ModificarArticuloModule)
  }

];

import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { LibrosComponent } from './libros/libros.component';
import { BiografiaComponent } from './biografia/biografia.component';

export const routes: Routes = [
   { path: '', component: MainComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'login', component: LoginComponent },
   { path: 'articulos', component: ArticulosComponent },
   { path: 'libros', component: LibrosComponent }, 
   { path: 'biografia', component: BiografiaComponent }
];

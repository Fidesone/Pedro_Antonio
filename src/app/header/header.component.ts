import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  name_user: string | null;
  constructor(private router: Router) {
    this.name_user = localStorage.getItem('name_user'); // Cargar nombre del usuario
  }

  navigateToLogin(): void {
    console.log('✅ Botón clicado, navegando a /login');
    this.router.navigate(['/login']);
  }
    navigateToRegister(): void {
    console.log('✅ Botón clicado, navegando a /login');
    this.router.navigate(['/register']);
  }


  
  
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule]
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
  navigateToArticles() {  
    this.router.navigate(['/articulos']);
  }
    navigateToBooks() {  
    this.router.navigate(['/libros']);
  }
    navigateToBiography() {  
    this.router.navigate(['/biografia']);
  }

  mostrarLogin = false;

  toggleLogin() {
  this.mostrarLogin = !this.mostrarLogin;
}
  
}

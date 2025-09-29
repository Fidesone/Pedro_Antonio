import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule]
})
export class HeaderComponent {
  name_user!: string | null;
  constructor(
  private http: HttpClient,
  private router: Router,
  @Inject(PLATFORM_ID) private platformId: Object
) {
  if (isPlatformBrowser(this.platformId)) {
    this.name_user = localStorage.getItem('name_user');
  }
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
  navigatetoContacto() {  
    this.router.navigate(['/contacto']);
  }

  mostrarLogin = false;

  toggleLogin() {
  this.mostrarLogin = !this.mostrarLogin;
}
  
irAWeb() {
  window.open('https://ejemplo.com', '_blank');
}
}

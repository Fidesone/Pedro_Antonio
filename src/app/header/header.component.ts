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
  categoriaSeleccionada: string | undefined;
  librosFiltrados: any;
  libros: any;
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
    navigateToInterviews() {  
    this.router.navigate(['/entrevistas']);
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
  filtrarLibros(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.librosFiltrados = this.libros.filter(
      (      libro: { categoria: string; }) => libro.categoria?.toLowerCase() === categoria.toLowerCase()
    );
  }
irAWeb() {
  window.open('https://ejemplo.com', '_blank');
}
}

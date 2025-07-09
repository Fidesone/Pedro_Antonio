import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss']
})
export class LibrosComponent implements OnInit {
  libros: any[] = [];
  librosFiltrados: any[] = [];
  categoriaSeleccionada: string = '';

    name_user: string | null = null; // ✅ Declaración correcta
constructor(private http: HttpClient, private router: Router) {

  this.name_user = localStorage.getItem('name_user'); 
}

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.apiUrl}/libros`).subscribe(
      (data) => {
        console.log('📚 Libros recibidos:', data);
        this.libros = data;
        this.librosFiltrados = data;
      },
      (error) => {
        console.error('❌ Error al obtener libros:', error);
      }
    );
  }

  filtrarLibros(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.librosFiltrados = this.libros.filter(
      (libro) => libro.categoria === categoria
    );
  }

  verTodos(): void {
    this.categoriaSeleccionada = '';
    this.librosFiltrados = this.libros;
  }

  navigateToArticles(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/articulos']);
    });
  }

  navigateToBiography(): void {
    this.router.navigate(['/biografia']);
  }
  irANuevoLibro(): void {
  this.router.navigate(['/nuevo-libro']);
}

}

import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute } from '@angular/router';


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
constructor(
  private http: HttpClient,
  private router: Router,
  private route: ActivatedRoute,   // 👈 añadido
  @Inject(PLATFORM_ID) private platformId: Object
) {
  if (isPlatformBrowser(this.platformId)) {
    this.name_user = localStorage.getItem('name_user');
  }
}

ngOnInit(): void {
  this.http.get<any[]>(`${environment.apiUrl}/libros`).subscribe(
    (data) => {
      console.log('📚 Libros recibidos:', data);
      this.libros = data;
      this.librosFiltrados = data;

      // 👇 Aquí lees la categoría de la URL
      this.route.queryParams.subscribe(params => {
        const categoria = params['categoria'];
        if (categoria) {
          this.filtrarLibros(categoria);
        }
      });
    },
    (error) => {
      console.error('❌ Error al obtener libros:', error);
    }
  );
}


  filtrarLibros(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.librosFiltrados = this.libros.filter(
      libro => libro.categoria?.toLowerCase() === categoria.toLowerCase()
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
  navigatetoContacto(): void {
    this.router.navigate(['/contacto']);
  }
  
    
irAModificarLibro(id: number): void {
  this.router.navigate(['/modificar-libro'], { queryParams: { id } });
}

irAWeb() {
  window.open('https://ejemplo.com', '_blank');
}

  getUrl(enlace: string | undefined): string {
  if (!enlace) return ''; // Evita el error si el enlace está vacío

  if (!enlace.startsWith('http')) {
    return `https://${enlace}`;
  }
  return enlace;
}

ordenAscendente = true;

ordenarPorAno(): void {
  this.librosFiltrados.sort((a, b) => {
    const añoA = a.anopublicacion ?? 0;
    const añoB = b.anopublicacion ?? 0;
    return this.ordenAscendente ? añoA - añoB : añoB - añoA;
  });
  this.ordenAscendente = !this.ordenAscendente;
} 
navigateToInterviews() {  
this.router.navigate(['/entrevistas']);
}
}

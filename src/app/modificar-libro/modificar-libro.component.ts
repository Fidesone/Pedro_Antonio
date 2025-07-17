import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser, CommonModule} from '@angular/common';
import { PLATFORM_ID } from '@angular/core'; 

@Component({
  selector: 'app-modificar-libro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modificar-libro.component.html',
  styleUrls: ['./modificar-libro.component.scss']
})
export class ModificarLibroComponent implements OnInit {
  libro: any = {};
  idLibro: number | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idLibro = params['id'] ? +params['id'] : null;

      if (this.idLibro !== null && isPlatformBrowser(this.platformId)) {
        this.http.get<any>(`${environment.apiUrl}/libros`).subscribe(data => {
          const encontrado = data.find((item: any) => item.id === this.idLibro);
          if (encontrado) {
            this.libro = encontrado;
          } else {
            alert('📕 Libro no encontrado');
            this.router.navigate(['/libros']);
          }
        });
      } else {
        console.warn('⚠️ No se proporcionó un ID válido o estamos en prerender.');
        this.router.navigate(['/libros']);
      }
    });
  }

  guardarCambios(): void {
    if (this.idLibro !== null) {
      this.http.put(`${environment.apiUrl}/libros/${this.idLibro}`, this.libro).subscribe({
        next: () => {
          alert('✅ Libro modificado correctamente');
          this.router.navigate(['/libros']);
        },
        error: err => {
          console.error('❌ Error al modificar libro:', err);
          alert('Ocurrió un error al guardar los cambios');
        }
      });
    } else {
      alert('⚠️ No hay ID de libro para modificar');
    }
  }

  volver(): void {
    this.router.navigate(['/libros']);
  }
}

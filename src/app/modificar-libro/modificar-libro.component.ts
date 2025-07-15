import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modificar-libro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modificar-libro.component.html',
  styleUrls: ['./modificar-libro.component.scss']
})
export class ModificarLibroComponent implements OnInit {
  libro: any = {};
  idLibro: number;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.idLibro = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/libros`).subscribe(data => {
      // Busca el libro por ID
      const encontrado = data.find((item: any) => item.id === this.idLibro);
      if (encontrado) {
        this.libro = encontrado;
      } else {
        alert('📕 Libro no encontrado');
        this.router.navigate(['/libros']);
      }
    });
  }

  guardarCambios(): void {
    this.http.put(`${environment.apiUrl}/libros/${this.idLibro}`, this.libro).subscribe({
      next: () => {
        alert('✅ Libro modificado correctamente');
        this.router.navigate(['/libros']);
      },
      error: (err) => {
        console.error('❌ Error al modificar libro:', err);
        alert('Ocurrió un error al guardar los cambios');
      }
    });
  }
    volver(): void {
    this.router.navigate(['/libros']);
  }
}

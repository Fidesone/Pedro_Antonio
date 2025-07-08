import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-nuevo-articulo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevo-articulo.component.html',
  styleUrls: ['./nuevo-articulo.component.scss']
})
export class NuevoArticuloComponent {
  nuevoArticulo = {
    titulo: '',
    subtitulo: '',
    resumen: '',
    url: '',
    imagen: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  guardarArticulo(): void {
    if (!this.nuevoArticulo.titulo.trim()) return;

    this.http.post<any>(`${environment.apiUrl}/articulos`, this.nuevoArticulo).subscribe(
      (res) => {
        this.router.navigate(['/articulos']);
      },
      (error) => {
        console.error('❌ Error al guardar artículo:', error);
      }
    );
  }

  volver(): void {
    this.router.navigate(['/articulos']);
  }
}

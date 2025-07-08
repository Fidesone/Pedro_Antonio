import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-nuevo-libro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevo-libro.component.html',
  styleUrls: ['./nuevo-libro.component.scss']
})
export class NuevoLibroComponent {
  nuevoLibro = {
    titulo: '',
    autor: '',
    descripcion: '',
    enlace: '',
    imagen: '',
    categoria: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  guardarLibro(): void {
    const { titulo, autor, descripcion, enlace } = this.nuevoLibro;
    if (!titulo.trim() || !autor.trim() || !descripcion.trim() || !enlace.trim()) {
      alert('Por favor, completa los campos obligatorios');
      return;
    }

    this.http.post<any>(`${environment.apiUrl}/libros`, this.nuevoLibro).subscribe(
      (res) => {
        this.router.navigate(['/libros']);
      },
      (error) => {
        console.error('❌ Error al guardar libro:', error);
      }
    );
  }

  volver(): void {
    this.router.navigate(['/libros']);
  }
}

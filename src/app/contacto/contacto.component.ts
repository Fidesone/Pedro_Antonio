import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { FooterComponent } from "../footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule, FooterComponent],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'], // ✅ corregido
  standalone: true
})
export class ContactoComponent {
  contacto = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  };

  estadoEnvio: 'exito' | 'error' | 'pendiente' | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  enviarFormulario() {
    console.log('📨 Datos del formulario:', this.contacto);
    this.estadoEnvio = 'pendiente';

    const url = `${environment.apiUrl}/contacto`;
    this.http.post(url, this.contacto).subscribe({
      next: res => {
        console.log('✅ Mensaje enviado correctamente', res);
        this.estadoEnvio = 'exito';
        this.contacto = { nombre: '', correo: '', asunto: '', mensaje: '' };

        alert('✅ El correo se ha enviado correctamente');
        this.router.navigate(['/biografia']);
      },
      error: err => {
        console.error('❌ Error al enviar el mensaje', err);
        this.estadoEnvio = 'error';
        alert('❌ Error al enviar el correo');
      }
    });
  }

  // 🔹 Métodos de navegación
  navigateToBookshand(categoria?: string): void {
    if (categoria) {
      this.router.navigate(['/libros'], { queryParams: { categoria } });
    } else {
      this.router.navigate(['/libros']);
    }
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

  navigateToInterviews() {
    this.router.navigate(['/entrevistas']);
  }
}

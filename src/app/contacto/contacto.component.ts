import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss',
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

  constructor(private http: HttpClient) {}

  enviarFormulario() {
    console.log('📨 Datos del formulario:', this.contacto);
    this.estadoEnvio = 'pendiente';

    const url = `${environment.apiUrl}/contacto`;
    console.log('🌐 URL usada para la petición:', url);
    this.http.post(`${environment.apiUrl}/contacto`, this.contacto)
    
      .subscribe({
        next: res => {
          console.log('✅ Mensaje enviado correctamente', res);
          this.estadoEnvio = 'exito';
          this.contacto = { nombre: '', correo: '', asunto: '', mensaje: '' }; // limpiar formulario
        },
        error: err => {
          console.error('❌ Error al enviar el mensaje', err);
          this.estadoEnvio = 'error';
        }
      });
  }
}

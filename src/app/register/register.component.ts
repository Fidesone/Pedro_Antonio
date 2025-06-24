import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BBDD_service } from '../bbdd.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  usuario = { name_user: '', email: '', password: '' };

  constructor(private BBDD_service: BBDD_service, private router: Router) {
    console.log('LoginComponent cargado');
  }
  onSubmit(formData: any): void {
    console.log('Datos del formulario enviados:', formData);
    this.BBDD_service.registerUser(formData).subscribe(
      response => {
        if (response.success) { // Verifica si el campo `success` en la respuesta es true
          console.log('Usuario registrado con éxito:', response);
          alert('Registro completado.');
        } else {
          console.error('Respuesta inesperada:', response);
          alert('Hubo un problema con el registro2.');
        }
      },
      error => {
        console.error('Error en el registro:', error); // Detalle completo del error
        alert('Hubo un problema con el registro3');
      }
    );
  }
  onNavigate(event: Event) {
    console.log('Enlace clicado:', event);
  }
}

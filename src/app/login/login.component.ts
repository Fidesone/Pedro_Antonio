import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BBDD_service } from '../bbdd.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formData = { name_user: '', password: '' };
  private isBrowser: boolean;

  constructor(
    private BBDD_service: BBDD_service,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    console.log('LoginComponent cargado');
  }

  onSubmit(): void {
    console.log('📤 Enviando datos al backend:', this.formData);

    this.BBDD_service.loginUser(this.formData).subscribe(
      response => {
        if (response.token) {
          console.log('✅ Inicio de sesión exitoso:', response);
          alert(`¡Hola ${this.formData.name_user}! Has iniciado sesión.`);

          if (this.isBrowser) {
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('name_user', this.formData.name_user);
          }

          this.router.navigate(['/']);
        } else {
          console.error('❌ Respuesta inesperada:', response);
          alert('Hubo un problema con el inicio de sesión.');
        }
      },
      error => {
        console.error('❌ Error en el login:', error);
        alert('Credenciales incorrectas o error en el servidor.');
      }
    );
  }
}

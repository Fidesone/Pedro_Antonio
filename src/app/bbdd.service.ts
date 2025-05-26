import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BBDD_service {
  private baseUrl = 'http://localhost:3000'; // URL del backend


  constructor(private http: HttpClient) {}

  // Registrar un nuevo usuario
  registerUser(data: { nombre: string; email: string; password: string }): Observable<any> {
    console.log('Datos enviados desde el servicio al backend:', data);
    return this.http.post(`${this.baseUrl}/register`, data);
  }
    // Método para iniciar sesión
    loginUser(data: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/login`, data);
    }
}

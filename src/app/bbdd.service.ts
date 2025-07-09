import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // 👈 Importar entorno

@Injectable({
  providedIn: 'root'
})
export class BBDD_service {
  private baseUrl = environment.apiUrl; // ✅ Usar URL dinámica

  constructor(private http: HttpClient) {}

// registerUser(data: { name_user: string; email: string; password: string }): Observable<any> {
//    return this.http.post(`${this.baseUrl}/register`, data);
//  }

  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
}

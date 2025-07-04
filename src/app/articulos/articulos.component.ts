import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { environment } from '../../environments/environments';


@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'] 
})
export class ArticulosComponent implements OnInit {
  articulos: any[] = [];
libros: any;
mostrarFormulario = false;
  nuevoArticulo = {
    titulo: '',
    subtitulo: '',
    resumen: '',
    url: '',
    imagen: ''
  };

constructor(private http: HttpClient, private router: Router) {}


  ngOnInit(): void {
    this.http.get<any[]>(`${environment.apiUrl}/articulos`)
      .subscribe(data => {
        this.articulos = data;
      });
  }
  navigateToBooks(): void {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/libros']);
  });
  }
  irANuevoArticulo(): void {
  this.router.navigate(['/nuevo-articulo']);
  }
  
  navigateToBiography() {  
  this.router.navigate(['/biografia']);
  }




}

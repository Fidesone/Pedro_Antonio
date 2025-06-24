import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'] 
})
export class ArticulosComponent implements OnInit {
  articulos: any[] = [];
libros: any;


constructor(private http: HttpClient, private router: Router) {}


  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/articulos')
      .subscribe(data => {
        this.articulos = data;
      });
  }
navigateToBooks(): void {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/libros']);
  });
}

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.scss'
})
export class ArticulosComponent implements OnInit {
  articulos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/articulos')
      .subscribe(data => {
        this.articulos = data;
      });
  }
}

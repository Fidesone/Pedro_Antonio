import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-entrevistas',
  imports: [FooterComponent],
  templateUrl: './entrevistas.component.html',
  styleUrl: './entrevistas.component.scss'
})
export class EntrevistasComponent {
[x: string]: any;

  constructor(private http: HttpClient, private router: Router) {} 
  navigateToArticles() {  
  this.router.navigate(['/articulos']);
}
navigateToBooks() {  
  this.router.navigate(['/libros']);
}
navigateToBiography() {  
  this.router.navigate(['/biografia']);
}
  navigatetoContacto(){  
  this.router.navigate(['/contacto']);
  }
navigateToBookshand(categoria?: string): void {
  if (categoria) {
    this.router.navigate(['/libros'], { queryParams: { categoria } });
  } else {
    this.router.navigate(['/libros']);
  }
}

}

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-modificar-articulo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modificar-articulo.component.html',
  styleUrls: ['./modificar-articulo.component.scss']
})
export class ModificarArticuloComponent implements OnInit {
  articulo: any = {};
  idArticulo: number | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idArticulo = params['id'] ? +params['id'] : null;

      if (this.idArticulo !== null && isPlatformBrowser(this.platformId)) {
        this.http.get<any>(`${environment.apiUrl}/articulos`).subscribe(data => {
          const encontrado = data.find((item: any) => item.id === this.idArticulo);
          if (encontrado) {
            this.articulo = encontrado;
          } else {
            alert('📄 Artículo no encontrado');
            this.router.navigate(['/articulos']);
          }
        });
      } else {
        console.warn('⚠️ No se proporcionó un ID válido o estamos en prerender.');
        this.router.navigate(['/articulos']);
      }
    });
  }

  guardarCambios(): void {
    if (this.idArticulo !== null) {
      this.http.put(`${environment.apiUrl}/articulos/${this.idArticulo}`, this.articulo).subscribe({
        next: () => {
          alert('✅ Artículo modificado correctamente');
          this.router.navigate(['/articulos']);
        },
        error: err => {
          console.error('❌ Error al modificar artículo:', err);
          alert('Ocurrió un error al guardar los cambios');
        }
      });
    } else {
      alert('⚠️ No hay ID de artículo para modificar');
    }
  }

  volver(): void {
    this.router.navigate(['/articulos']);
  }
}

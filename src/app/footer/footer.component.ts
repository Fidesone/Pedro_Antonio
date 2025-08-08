import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  mostrarCorreo = false;

  copiarCorreo() {
    const correo = 'pagonzalezmor@hotmail.com';
    navigator.clipboard.writeText(correo).then(() => {
      alert('El correo pagonzalezmor@hotmail.com se ha copiado al portapapeles');
    });
  }

  mostrar() {
    this.mostrarCorreo = true;
  }

  ocultar() {
    this.mostrarCorreo = false;
  }
}

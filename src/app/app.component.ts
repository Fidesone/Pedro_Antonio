import { Component } from '@angular/core';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], 
  template: `<router-outlet></router-outlet>`, 
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pedro Antonio González Moreno';
}
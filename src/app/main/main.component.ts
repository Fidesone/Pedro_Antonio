import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, RouterModule, CommonModule, FooterComponent],
  templateUrl: './main.component.html', 
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

}

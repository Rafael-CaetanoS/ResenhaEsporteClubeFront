import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbarprincipal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbarprincipal.component.html',
  styleUrl: './navbarprincipal.component.css'
})
export class NavbarprincipalComponent {
  isMenuOpen: boolean = false;  

}

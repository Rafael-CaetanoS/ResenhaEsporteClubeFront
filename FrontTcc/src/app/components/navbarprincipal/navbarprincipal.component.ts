import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbarprincipal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbarprincipal.component.html',
  styleUrl: './navbarprincipal.component.css'
})
export class NavbarprincipalComponent {
  isMenuOpen: boolean = false;
  idJogador:  string | null = null;


  constructor(private service: LoginService, private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.idJogador = sessionStorage.getItem('idAtleta')
    }
  }

  sair() {
    this.service.sair();
    this.router.navigate(['']);
  }
}

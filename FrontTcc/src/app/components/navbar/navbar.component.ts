import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  urlAtual: string = '';
  constructor(private router: Router) {}
  ngOnInit() {
    this.urlAtual = this.router.url;

    this.router.events.subscribe(() => {
      this.urlAtual = this.router.url;
    });
  }

  routeCadastro(): boolean {
    return this.urlAtual.includes('/Cadastraratleta');
  }
  routeHome(): boolean {
    return this.urlAtual === '/';
  }

  routeLogin(): boolean {
    return this.urlAtual === '/Login';
  }
}

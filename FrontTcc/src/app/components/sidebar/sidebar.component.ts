import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isMenuOpen: boolean = false;  
  apelido: string | null = null;

  constructor(private service:LoginService, private router: Router){

  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; 
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.apelido = sessionStorage.getItem('apelido');
    }
  }

  sair(){
    this.service.sair();
    this.router.navigate(['']);
  }
}

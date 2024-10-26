// LoginComponent.ts
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  logar() {
    this.service.login(this.loginForm.value.email, this.loginForm.value.senha).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido', response);

        const nomeAtleta = response.name;

        localStorage.setItem('nomeAtleta', nomeAtleta);

        this.router.navigate(['/Inicio']);
      },
      error: (error) => {
        console.error('Erro ao fazer login:', error);
      }
    });
  }

  /*logout(){
    localStorage.removeItem('nomeAtleta');
    localStorage.removeItem('idAtleta');
    this.router.navigate(['/login']); // Redireciona para a página de login
  }*/
}

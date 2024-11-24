import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2'; // Importação do SweetAlert2
import { NavbarComponent } from '../../components/navbar/navbar.component';
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

        // Salvar nome ou informações do usuário no localStorage, se necessário
        localStorage.setItem('nomeAtleta', nomeAtleta);
        localStorage.setItem('idAtleta', response.idAtleta);

        // Exibe notificação de sucesso
        Swal.fire({
          icon: 'success',
          title: 'Login bem-sucedido!',
          text: `Bem-vindo, ${nomeAtleta}!`,
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/Inicio']); // Redireciona para a página inicial
        });
      },
      error: (error) => {
        console.error('Erro ao fazer login:', error);

        // Exibe notificação de erro
        Swal.fire({
          icon: 'error',
          title: 'Erro no login',
          text: 'E-mail ou senha inválidos. Tente novamente.',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  /*logout() {
    localStorage.removeItem('nomeAtleta');
    localStorage.removeItem('idAtleta');
    this.router.navigate(['/login']); // Redireciona para a página de login
  }*/
}

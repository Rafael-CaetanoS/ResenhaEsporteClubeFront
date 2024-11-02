import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router'; 
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CadastrarAtletaService } from '../../services/cadastrar-atleta.service';


@Component({
  selector: 'app-cadastrar-atleta',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastrar-atleta.component.html',
  styleUrls: ['./cadastrar-atleta.component.css']
})
export class CadastrarAtletaComponent {
  formCadastro!: FormGroup;

  constructor(private service:CadastrarAtletaService, private formBuilder: FormBuilder, private router:Router) { 
    this.formCadastro = this.formBuilder.group({
      nomeAtleta: ['', Validators.required],
      apelido: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      senha: ['', Validators.required],
      confirmaSenha: ['', Validators.required],
    }, { validator: this.senhasIguaisValidator });
  }

  senhasIguaisValidator(formGroup: FormGroup) {
    const senha = formGroup.get('Senha')?.value;
    const confirmaSenha = formGroup.get('ConfirmaSenha')?.value;

    return senha === confirmaSenha ? null : { senhasNaoConferem: true };
  }

  postar() {
    if (this.formCadastro.invalid) {
      this.formCadastro.markAllAsTouched();
      return;
    }

    this.service.cadastrarAtleta(this.formCadastro.value).subscribe({
      next: (response) => {
        console.log('Cadastro realizado com sucesso:', response);
        alert('Cadastro realizado com sucesso!'); // Redireciona para a tela de login
      },
      error: (error) => {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar. Tente novamente mais tarde.');
      }
    });
  }
}

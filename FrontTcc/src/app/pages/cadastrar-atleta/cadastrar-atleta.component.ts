import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2'; 
import { NavbarComponent } from '../../components/navbar/navbar.component';
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

  constructor(
    private service: CadastrarAtletaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formCadastro = this.formBuilder.group(
      {
        nomeAtleta: ['', Validators.required],
        apelido: ['', Validators.required],
        dataNascimento: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', Validators.required],
        senha: ['', Validators.required],
        confirmaSenha: ['', Validators.required],
      },
      { validator: this.senhasIguaisValidator }
    );
  }

  senhasIguaisValidator(formGroup: FormGroup) {
    const senha = formGroup.get('senha')?.value;
    const confirmaSenha = formGroup.get('confirmaSenha')?.value;
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

        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado!',
          text: 'Seu cadastro foi concluído com sucesso.',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['']); 
        });
      },
      error: (error) => {
        console.error('Erro ao cadastrar:', error);

        Swal.fire({
          icon: 'error',
          title: 'Erro ao cadastrar',
          text: 'Ocorreu um problema ao realizar o cadastro. Tente novamente mais tarde.',
        });
      },
    });
  }
}

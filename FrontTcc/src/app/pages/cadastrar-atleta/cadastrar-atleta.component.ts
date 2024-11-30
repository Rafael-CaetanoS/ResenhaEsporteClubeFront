import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
  erroCadastro: string | null = null;

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
      { validator: 
        [
          this.senhasIguaisValidator,
          this.dataPassadaValidator
        ]
      }
    );
  }

  dataPassadaValidator(control: AbstractControl): ValidationErrors | null {
    const dataNascimento = new Date(control.value);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Ignorar horas para considerar apenas o dia

    return dataNascimento > hoje ? { dataFutura: true } : null;
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

        this.erroCadastro = null;

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

        if (error.status === 409) { 
          Swal.fire({
            icon: 'error',
            title: 'Usuário já cadastrado!',
            text: 'Ocorreu um problema ao realizar o cadastro. Tente inserir outro e-mail.',
            confirmButtonText: 'OK',
          });
        } else if (error.status === 400 && error.error?.message === 'Email inválido') {
          this.erroCadastro = 'E-mail inválido.';
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao cadastrar',
            text: 'Ocorreu um problema ao realizar o cadastro. Tente novamente mais tarde.',
          });
        }
      },
    });
  }
}

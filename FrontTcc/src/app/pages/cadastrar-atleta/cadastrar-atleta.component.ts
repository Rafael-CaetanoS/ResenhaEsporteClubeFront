import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CadastrarAtletaService } from '../../services/cadastrar-atleta.service';
import { atletaResponse } from '../../types/atleta-response.type';

@Component({
  selector: 'app-cadastrar-atleta',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastrar-atleta.component.html',
  styleUrls: ['./cadastrar-atleta.component.css']
})
export class CadastrarAtletaComponent {
  formCadastro!: FormGroup;
  erroCadastro: string | null = null;
  exibirModal = false;
  erroTelefone: boolean = false;

  constructor(
    private service: CadastrarAtletaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formCadastro = this.formBuilder.group(
      {
        nomeAtleta: ['', Validators.required],
        apelido: ['', Validators.required],
        dataNascimento: ['', [Validators.required, this.dataPassadaValidator]], // Corrigido aqui
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', Validators.required], // Corrigido 
        senha: ['', Validators.required],
        confirmaSenha: ['', Validators.required],
        aceitaTermos: [false, Validators.requiredTrue]
      },
      { validator: this.senhasIguaisValidator }
    );
  }

  dataPassadaValidator(control: AbstractControl): ValidationErrors | null {
    const dataNascimento = new Date(control.value);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Ignorar horas para considerar apenas o dia

    return dataNascimento > hoje ? { dataFutura: true } : null;
  }

  telefoneValidator(telefone: any = this.formCadastro.get('telefone')?.value) {
    const telefoneFormatado = telefone.replace(/[^\d]+/g, '');
    if(telefoneFormatado.length === 10 || telefoneFormatado.length === 11) {
      this.formatarTelefone(); 
      this.erroTelefone = false;
    }else if(telefoneFormatado !== ''){
      this.erroTelefone = true;
    }else{
      this.erroTelefone = false;
    }

    return telefoneFormatado.length === 10 || telefoneFormatado.length === 11;
  }

  validarTelefone() {
    let telefone = this.formCadastro.get('telefone')?.value;
    telefone = telefone.replace(/[^\d]+/g, '');
     
    if (telefone.length > 11) {
      telefone = telefone.substring(0, 11); 
    }
    this.formCadastro.get('telefone')?.setValue(telefone); 
  }

  formatarTelefone() {
    let telefone = this.formCadastro.get('telefone')?.value;

    if (/[^\d]/.test(telefone.charAt(telefone.length - 1))) {
      telefone = telefone.slice(0, -1);
    }

    telefone = telefone.replace(/[^\d]+/g, ''); 

    if (telefone.length <= 10) {
      telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'); // telefone fixo
    } else if (telefone.length === 11) {
      telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); // celular
    }

    this.formCadastro.get('telefone')?.setValue(telefone); 
  }

  senhasIguaisValidator(formGroup: FormGroup) {
    const senha = formGroup.get('senha')?.value;
    const confirmaSenha = formGroup.get('confirmaSenha')?.value;
    return senha === confirmaSenha ? null : { senhasNaoConferem: true };
  }

  abrirModal() {
    this.exibirModal = true;
  }

  fecharModal() {
      this.exibirModal = false;
  }

  postar() {

    if (this.formCadastro.invalid) {
      this.formCadastro.markAllAsTouched();
      return;
    }

    const atletaData : atletaResponse = {
      idAtleta: '',
      apelido: this.formCadastro.value.apelido ,
      dataNascimento: this.formCadastro.value.dataNascimento,
      email: this.formCadastro.value.email,
      imagem: '' ,
      nomeAtleta: this.formCadastro.value.nomeAtleta,
      senha: this.formCadastro.value.senha,
      telefone: this.formCadastro.value.telefone.replace(/[^\d]+/g, '') //replace para salvar sem qualquer caractere
    }

    if(this.telefoneValidator()){
      this.service.cadastrarAtleta(atletaData).subscribe({
        next: () => {
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

}

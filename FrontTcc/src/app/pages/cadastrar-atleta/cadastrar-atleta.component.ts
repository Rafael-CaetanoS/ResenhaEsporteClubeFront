import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastrar-atleta',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FormsModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './cadastrar-atleta.component.html',
  styleUrls: ['./cadastrar-atleta.component.css']
})
export class CadastrarAtletaComponent {
  formCadastro!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formCadastro = this.formBuilder.group({
      Nome: ['', Validators.required],
      Apelido: ['', Validators.required],
      Data: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Telefone: ['', Validators.required],
      Senha: ['', Validators.required],
      ConfirmaSenha: ['', Validators.required],
    });
  }

  postar() {
    if (!this.formCadastro.valid) {
      console.log('Formulário inválido');
      return;
    }
    console.log('Formulário válido', this.formCadastro.value);
  }
}

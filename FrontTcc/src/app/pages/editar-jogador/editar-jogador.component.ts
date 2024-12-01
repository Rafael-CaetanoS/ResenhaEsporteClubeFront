import { Component, OnInit } from '@angular/core';
import { NavbarprincipalComponent } from "../../components/navbarprincipal/navbarprincipal.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CadastrarAtletaService } from '../../services/cadastrar-atleta.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { atletaResponse } from '../../types/atleta-response.type';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-jogador',
  standalone: true,
  imports: [NavbarprincipalComponent, SidebarComponent, RouterLink,CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-jogador.component.html',
  styleUrl: './editar-jogador.component.css'
})
export class EditarJogadorComponent implements OnInit{
  formCadastro!: FormGroup;
  atleta!: atletaResponse;
  erroCadastro: string | null = null;

  constructor(
    private service: CadastrarAtletaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

ngOnInit(): void {
   this.formCadastro = this.formBuilder.group(
      {
        nomeAtleta: ['', Validators.required],
        apelido: ['', Validators.required],
        dataNascimento: ['', [Validators.required, this.dataPassadaValidator]], // Corrigido aqui
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', Validators.required],
      },

    );
    this.route.paramMap.subscribe((value) => {      
      const id = value.get('id');
      if (id) {
        this.service.buscarAtleta(id).subscribe({
          next:(atleta) =>{
            this.atleta = atleta;
            this.formCadastro.patchValue({
              nomeAtleta: this.atleta.nomeAtleta,
              apelido: this.atleta.apelido,
              dataNascimento: this.atleta.dataNascimento,
              email: this.atleta.email,
              telefone: this.atleta.telefone,
            })
          },
          error: (err) => console.error('Erro ao buscar jogador:', err),
        });
     }
    });
}


  dataPassadaValidator(control: AbstractControl): ValidationErrors | null {
    const dataNascimento = new Date(control.value);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Ignorar horas para considerar apenas o dia

    return dataNascimento > hoje ? { dataFutura: true } : null;
  }

  atualizar() {
    if (this.formCadastro.invalid) {
      this.formCadastro.markAllAsTouched();
      return;
    }


    const atletaData : atletaResponse = {
      idAtleta: this.atleta.idAtleta,
      apelido: this.formCadastro.value.apelido ,
      dataNascimento: this.formCadastro.value.dataNascimento,
      email: this.formCadastro.value.email,
      imagem: '' ,
      nomeAtleta: this.formCadastro.value.nomeAtleta,
      senha: this.atleta.senha,
      telefone: this.formCadastro.value.telefone.replace(/[^\d]+/g, '') //replace para salvar sem qualquer caractere
    }


    this.service.atualizarAtleta(atletaData).subscribe({
      next: (response) => {
        this.erroCadastro = null;

        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado!',
          text: 'Seu cadastro foi concluído com sucesso.',
          confirmButtonText: 'OK',
        }).then(() => {
          sessionStorage.setItem("apelido", response.apelido);
          this.router.navigate(['/Inicio']); 
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

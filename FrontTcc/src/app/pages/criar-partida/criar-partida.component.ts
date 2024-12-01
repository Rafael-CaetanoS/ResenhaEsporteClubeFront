import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2'; // Importação do SweetAlert2
import { NavbarprincipalComponent } from '../../components/navbarprincipal/navbarprincipal.component';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { EsportesService } from '../../services/esportes.service';
import { PartidasService } from '../../services/partidas.service';
import { EsporteResponse } from '../../types/esportes-response.type';
import { PartidaResponse } from '../../types/partida-response.type';

@Component({
  selector: 'app-criar-partida',
  standalone: true,
  imports: [SidebarComponent, RouterLink, FormsModule, ReactiveFormsModule, CommonModule, NavbarprincipalComponent],
  templateUrl: './criar-partida.component.html',
  styleUrls: ['./criar-partida.component.css']
})
export class CriarPartidaComponent implements OnInit {
  idAtleta: string | null = null;
  formPartida!: FormGroup;
  esporte: EsporteResponse[] = [];

  constructor(private formBuilder: FormBuilder, private serviceEsporte: EsportesService, private servicePartida: PartidasService, private router: Router) {
    this.formPartida = this.formBuilder.group({
      titulo: ['', Validators.required],
      data: ['', Validators.required],
      descricao: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFim: ['', Validators.required],
      qtdeAtletas: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
      idEsporte: ['', Validators.required],
      endereco: ['', Validators.required],
      nomeLocal: ['', Validators.required],
      cidade: ['', Validators.required],
    },
    {  validator: [this.horarioValidador.bind(this), this.dataValidador.bind(this)]}

  );
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.idAtleta = sessionStorage.getItem('idAtleta');
    }
    this.serviceEsporte.getEsportes().subscribe({
      next: (res) => {
        this.esporte = res.map((item) => ({
          idEsporte: item.idEsporte,
          nomeEsporte: item.nomeEsporte
        }));
      }
    });
  }

  apenasNumeros(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    
    if (!/^\d+$/.test(event.key)) {
      event.preventDefault();
      return;
    }
    
    if (input.value.length >= 4) {
      event.preventDefault();
    }
  }

 horarioValidador(formGroup: FormGroup) {
    const horaInicio = formGroup.get('horaInicio')?.value;
    const horaFim = formGroup.get('horaFim')?.value;
    return horaInicio <= horaFim ? null : { horarioInvalido: true };
  }

  dataValidador(formGroup: FormGroup) {
    const data = formGroup.get('data')?.value;
    const dataAtual = new Date();

    const dataSelecionada = new Date(data + 'T00:00:00');
    dataSelecionada.setHours(0, 0, 0, 0);
    dataAtual.setHours(0, 0, 0, 0);
    return dataSelecionada >= dataAtual ? null : { dataInvalida: true };
  }

  postar() {
    if (this.formPartida.invalid) {
      this.formPartida.markAllAsTouched();
      return;
    }
    const partidaData: PartidaResponse = {
      idPartida: '',
      titulo: this.formPartida.value.titulo,
      descricao: this.formPartida.value.descricao,
      horaInicio: this.formPartida.value.horaInicio,
      horaFim: this.formPartida.value.horaFim,
      data:this.formPartida.value.data,
      qtdeAtletas: this.formPartida.value.qtdeAtletas,
      endereco: this.formPartida.value.endereco,
      nomeLocal: this.formPartida.value.nomeLocal,
      cidade: this.formPartida.value.cidade,
      atleta: {
        idAtleta: this.idAtleta ? this.idAtleta : '',
        nomeAtleta: ''
      },
      esporte: {
        idEsporte: this.formPartida.value.idEsporte,
        nomeEsporte: ''
      },
      statusPartida: {
        idStatusPartida: "1"
      }
    };

    this.servicePartida.postPartidas(partidaData).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado!',
          text: 'Sua partida foi cadastrada com sucesso.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate([`/GerenciarPartidas/${response.idPartida}`]);
        });
      },
      error: (error) => {
        console.error('Erro ao cadastrar:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao cadastrar',
          text: 'Não foi possível realizar o cadastro. Tente novamente mais tarde.',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}

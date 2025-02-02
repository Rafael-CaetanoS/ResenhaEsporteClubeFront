import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { EsportesService } from '../../services/esportes.service';
import { PartidasService } from '../../services/partidas.service';
import { EsporteResponse } from '../../types/esportes-response.type';
import { PartidaResponse } from '../../types/partida-response.type';
import { NavbarprincipalComponent } from "../navbarprincipal/navbarprincipal.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, SidebarComponent, NavbarprincipalComponent, CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  partida: PartidaResponse = {
    esporte: { nomeEsporte: '' },
    statusPartida: { idStatusPartida: '' },
    atleta: {idAtleta: ''}
  } as PartidaResponse;
  formPartida!: FormGroup;
  esporte: EsporteResponse[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private serviceEsporte: EsportesService,
    private servicePartida: PartidasService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formPartida = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: [''],
      horaInicio: ['', Validators.required],
      horaFim: ['', Validators.required],
      data: ['', Validators.required],
      qtdeAtletas: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
      endereco: ['', Validators.required],
      nomeLocal: ['', Validators.required],
      cidade: ['', Validators.required],
      idEsporte: ['', Validators.required],
    },
    {  validator: [this.horarioValidador.bind(this), this.dataValidador.bind(this)]}

  );
    this.serviceEsporte.getEsportes().subscribe({
      next: (res) => {
        this.esporte = res.map((item) => ({
          idEsporte: item.idEsporte,
          nomeEsporte: item.nomeEsporte,
        }));
      },
      error: (err) => console.error('Erro ao buscar esportes:', err),
    });

    this.route.paramMap.subscribe((value) => {      
      const id = value.get('id');
      if (id) {
        this.servicePartida.getPartidaById(id).subscribe({
          next: (partida) => {
            this.partida = partida;
            this.formPartida.patchValue({
              titulo: partida.titulo,
              descricao: partida.descricao,
              horaInicio: partida.horaInicio,
              horaFim: partida.horaFim,
              data: partida.data,
              qtdeAtletas: partida.qtdeAtletas,
              endereco: partida.endereco,
              nomeLocal: partida.nomeLocal,
              cidade: partida.cidade,
              idEsporte: partida.esporte.idEsporte,
            });
          },
          error: (err) => console.error('Erro ao buscar partida:', err),
        });
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



  atualizar() {
    if (this.formPartida.invalid) {
      this.formPartida.markAllAsTouched();
      return;
    }
    this.formPartida.value.data = new Date(this.formPartida.value.data).toISOString();

    const partidaData: PartidaResponse = {
      idPartida: this.partida.idPartida,
      titulo: this.formPartida.value.titulo,
      descricao: this.formPartida.value.descricao,
      horaInicio: this.formPartida.value.horaInicio,
      horaFim: this.formPartida.value.horaFim,
      data: this.formPartida.value.data,
      qtdeAtletas: this.formPartida.value.qtdeAtletas,
      endereco: this.formPartida.value.endereco,
      nomeLocal: this.formPartida.value.nomeLocal,
      cidade: this.formPartida.value.cidade,
      atleta: {
        idAtleta: this.partida.atleta.idAtleta,
        nomeAtleta: '',
        apelido:''
      },
      esporte: {
        idEsporte: this.formPartida.value.idEsporte,
        nomeEsporte: ''
      },
      statusPartida: {
        idStatusPartida: this.partida.statusPartida.idStatusPartida
      }
    };

    this.servicePartida.atualizarPartida(partidaData).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Partida atualizada com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate([`/GerenciarPartidas/${response.idPartida}`]);
        });
      },
      error: () => {
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao cadastrar. Tente novamente mais tarde.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}

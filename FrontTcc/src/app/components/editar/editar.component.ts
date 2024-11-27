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
  partida!: PartidaResponse;
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
      qtdeAtletas: ['', Validators.required],
      endereco: ['', Validators.required],
      nomeLocal: ['', Validators.required],
      cidade: ['', Validators.required],
      idEsporte: ['', Validators.required],
    },
    { validator: this.horarioValidador }
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
              data: partida.data
                ? (() => {
                    const data = new Date(partida.data);
                    const localData = new Date(data.getTime() - data.getTimezoneOffset() * 60000); // Ajusta o fuso horário
                    const ano = localData.getFullYear();
                    const mes = String(localData.getMonth() + 1).padStart(2, '0');
                    const dia = String(localData.getDate()).padStart(2, '0');
                    return `${ano}-${mes}-${dia}`;
                  })()
                : '',
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

  horarioValidador(formGroup: FormGroup) {
    const horaInicio = formGroup.get('horaInicio')?.value;
    const horaFim = formGroup.get('horaFim')?.value;
    return horaInicio <= horaFim ? null : { horarioInvalido: true };
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
      data: (() => {
        const dataAtual = new Date(this.formPartida.value.data);
        dataAtual.setDate(dataAtual.getDate() + 1);
        return dataAtual;
      })(),
      qtdeAtletas: this.formPartida.value.qtdeAtletas,
      endereco: this.formPartida.value.endereco,
      nomeLocal: this.formPartida.value.nomeLocal,
      cidade: this.formPartida.value.cidade,
      atleta: {
        idAtleta: this.partida.atleta.idAtleta,
        nomeAtleta: ''
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
      error: (error) => {
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

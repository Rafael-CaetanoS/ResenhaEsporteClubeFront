import { Component, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EsporteResponse } from '../../types/esportes-response.type';
import { EsportesService } from '../../services/esportes.service';
import { PartidasService } from '../../services/partidas.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PartidaResponse } from '../../types/partida-response.type';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NavbarprincipalComponent } from "../navbarprincipal/navbarprincipal.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, SidebarComponent, NavbarprincipalComponent, CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit{
  partida! : PartidaResponse
  formPartida!: FormGroup
  esporte: EsporteResponse[] = [];

  constructor(private formBuilder: FormBuilder, private serviceEsporte: EsportesService, private servicePartida: PartidasService, private router: Router, private route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.formPartida = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: [''],
      horaInicio: ['', Validators.required],
      horaFim: ['', Validators.required],
      data: ['', Validators.required],
      faixaEtaria: ['', Validators.required],
      qtdeAtletas: ['', Validators.required],
      endereco: ['', Validators.required],
      nomeLocal: ['', Validators.required],
      cidade: ['', Validators.required],
      idEsporte: ['', Validators.required],
    });

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
              faixaEtaria: partida.faixaEtaria,
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
    atualizar() {
  
      // if (this.formPartida.invalid) {
      //   this.formPartida.markAllAsTouched();
      //   return;
      // }
      this.formPartida.value.data = new Date(this.formPartida.value.data).toISOString();
      
      const partidaData: PartidaResponse = {
        idPartida: this.partida.idPartida, 
        titulo: this.formPartida.value.titulo,
        descricao: this.formPartida.value.descricao,
        horaInicio: this.formPartida.value.horaInicio,
        horaFim: this.formPartida.value.horaFim,
        data: this.formPartida.value.data,
        faixaEtaria: this.formPartida.value.faixaEtaria,
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
        statusPartida:{
          idStatusPartida: this.partida.statusPartida.idStatusPartida
        }
      };
      console.log(partidaData)
      this.servicePartida.atualizarPartida(partidaData).subscribe({

        next: (response) => {
          console.log('Cadastro realizado com sucesso:', response);
          alert('Cadastro realizado com sucesso!');
          this.router.navigate([`/GerenciarPartidas/${response.idPartida}`]);
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);
          alert('Erro ao cadastrar. Tente novamente mais tarde.');
        }
      });
    }
}

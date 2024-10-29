import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EsportesService } from '../../services/esportes.service';
import { EsporteResponse } from '../../types/esportes-response.type';
import { PartidasService } from '../../services/partidas.service';
import { PartidaResponse } from '../../types/partida-response.type';

@Component({
  selector: 'app-criar-partida',
  standalone: true,
  imports: [SidebarComponent, RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './criar-partida.component.html',
  styleUrls: ['./criar-partida.component.css']
})
export class CriarPartidaComponent implements OnInit {
  idAtleta: string | null = null;
  formPartida!: FormGroup;
  esporte: EsporteResponse[] = [];

  constructor(private formBuilder: FormBuilder, private serviceEsporte: EsportesService, private servicePartida: PartidasService) {
    this.formPartida = this.formBuilder.group({
      titulo: ['', Validators.required],
      data: ['', Validators.required],
      descricao: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFim: ['', Validators.required],
      qtdeAtletas: ['', Validators.required],
      idAtleta: ['', Validators.required],
      idEsporte: ['', Validators.required],
      endereco: ['', Validators.required],
      nomeLocal: ['', Validators.required],
      faixaEtaria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.idAtleta = sessionStorage.getItem('idAtleta');
      console.log(this.idAtleta)
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

    postar() {
  
      // if (this.formPartida.invalid) {
      //   this.formPartida.markAllAsTouched();
      //   return;
      // }
    
      
      const partidaData: PartidaResponse = {
        idPartida: '', 
        titulo: this.formPartida.value.titulo,
        descricao: this.formPartida.value.descricao,
        horaInicio: this.formPartida.value.horaInicio,
        horaFim: this.formPartida.value.horaFim,
        data: this.formPartida.value.data,
        faixaEtaria: this.formPartida.value.faixaEtaria,
        qtdeAtletas: this.formPartida.value.qtdeAtletas,
        endereco: this.formPartida.value.endereco,
        nomeLocal: this.formPartida.value.nomeLocal,
        atleta: { 
          idAtleta: this.idAtleta ? this.idAtleta : '',  
          nomeAtleta: ''  
        },
        esporte: {
          idEsporte: this.formPartida.value.idEsporte,
          nomeEsporte: '' 
        }
      };
    
      console.log(partidaData)

      this.servicePartida.postPartidas(partidaData).subscribe({
        next: (response) => {
          console.log('Cadastro realizado com sucesso:', response);
          alert('Cadastro realizado com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);
          alert('Erro ao cadastrar. Tente novamente mais tarde.');
        }
      });
    }
  }


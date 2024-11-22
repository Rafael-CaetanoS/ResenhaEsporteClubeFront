import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EsportesService } from '../../services/esportes.service';
import { EsporteResponse } from '../../types/esportes-response.type';
import { PartidasService } from '../../services/partidas.service';
import { PartidaResponse } from '../../types/partida-response.type';
import { NavbarprincipalComponent } from '../../components/navbarprincipal/navbarprincipal.component';

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
      qtdeAtletas: ['', Validators.required],
      idAtleta: ['', Validators.required],
      idEsporte: ['', Validators.required],
      endereco: ['', Validators.required],
      nomeLocal: ['', Validators.required],
      cidade:['', Validators.required]
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
        data: (() => {
          const dataAtual = new Date(this.formPartida.value.data); // Converte a string para Date
          dataAtual.setDate(dataAtual.getDate() + 1); // Incrementa 1 dia
          return dataAtual; // Retorna como Date
        })(),
        faixaEtaria: this.formPartida.value.faixaEtaria,
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
          statusPartida:{
            idStatusPartida: "1"
          }
      };
    
      console.log(partidaData)

      this.servicePartida.postPartidas(partidaData).subscribe({
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


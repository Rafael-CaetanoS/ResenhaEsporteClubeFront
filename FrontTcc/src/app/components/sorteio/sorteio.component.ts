import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { GerenciarService } from '../../services/gerenciar.service';
import { inscricaoResponse } from '../../types/inscricao-response.Type';
import { timeResponse } from '../../types/time-response.type';
import { CardTimeComponent } from "../card-time/card-time.component";

@Component({
  selector: 'app-sorteio',
  standalone: true,
  imports: [CommonModule, FormsModule, CardTimeComponent],
  templateUrl: './sorteio.component.html',
  styleUrl: './sorteio.component.css'
})
export class SorteioComponent implements OnInit {
  @Input() inscricoes: inscricaoResponse[] = [];
  @Input() idPartida: string = "";

  aviso: boolean = false;

  constructor(private service: GerenciarService) {}

  jogadoresPorTime: number = 5;
  timesGerados: timeResponse[] = [];
  qtdejogadores = 0;
  timesCadastrados: timeResponse[] = [];

  ngOnInit(): void {
    this.qtdejogadores = this.inscricoes.length;

    this.service.getTimesPartidas(this.idPartida).subscribe({
      next: (res) => {
        this.timesCadastrados = res;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  embaralharArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  sortear(): timeResponse[] {
    this.timesGerados = [];
    const atletasEmbaralhados = this.embaralharArray(this.inscricoes);

    let contadorDeTimes = 1;

    for (let i = 0; i < atletasEmbaralhados.length; i += this.jogadoresPorTime) {
      const time = atletasEmbaralhados.slice(i, i + this.jogadoresPorTime);
      const mapearTime: timeResponse = {
        nomeTime: `Time - ${contadorDeTimes} `,
        totalPontos: '0',
        partida: {
          idPartida: this.idPartida
        },
        jogadores: time.map(atleta => ({
          inscricao: {
            idInscricao: atleta.idInscricao,
            atleta: {
              nomeAtleta: atleta.atleta.nomeAtleta,
              apelido: atleta.atleta.apelido
            }
          }
        }))
      };
      contadorDeTimes++;
      this.timesGerados.push(mapearTime);
    }
    return this.timesGerados;
  }

  incrementar() {
    this.jogadoresPorTime++;
  }

  decrementar() {
    if (this.jogadoresPorTime > 1) {
      this.jogadoresPorTime--;
    }
  }

  salvar() {
    this.aviso = false;
    if (this.timesGerados.length < 2) {
      Swal.fire({
        title: 'Aviso',
        text: 'É necessário gerar pelo menos dois times para salvar.',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    this.service.salvarTimes(this.timesGerados).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Times cadastrados com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao cadastrar os times. Verifique os dados e tente novamente.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Erro ao cadastrar os times:', error);
      },
    });
  }
}

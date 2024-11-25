import { Component, Input, OnInit } from '@angular/core';
import { CronometroComponent } from "../cronometro/cronometro.component";
import { PlacarComponent } from "../placar/placar.component";
import { CardTimeComponent } from "../card-time/card-time.component";
import { timeResponse } from '../../types/time-response.type';
import { CommonModule } from '@angular/common';
import { GerenciarService } from '../../services/gerenciar.service';

@Component({
  selector: 'app-partidas',
  standalone: true,
  imports: [CronometroComponent, PlacarComponent, CardTimeComponent, CommonModule],
  templateUrl: './partidas.component.html',
  styleUrl: './partidas.component.css'
})
export class PartidasComponent implements OnInit {
  times: timeResponse[] = []; // Fila de times carregada do banco
  currentGame: { time1: timeResponse; time2: timeResponse } | null = null;
  @Input()
  idPartida: string ="";

  constructor(private service: GerenciarService) {
    this.initializeGame(); // Carregar os times iniciais
  }

  ngOnInit(): void {
    this.service.getTimesPartidas(this.idPartida).subscribe({
      next: (res) => {
        this.times = res;
        console.log(this.times)
      },
      error: (error) => {
        console.error( error);
      },
    });
  }
  
  initializeGame(): void {
    // Configura o primeiro jogo
    this.setupNextGame();
  }

  setupNextGame(): void {
    if (this.times.length >= 2) {
      // Seleciona os dois primeiros times da fila
      const time1 = this.times[0];
      const time2 = this.times[1];
      this.currentGame = { time1, time2 };
    } else {
      this.currentGame = null; // Não há times suficientes para continuar
    }
  }

  handleGameOver(winner: timeResponse): void {
    // Move o vencedor para o início da fila
    const loser = this.currentGame?.time1 === winner ? this.currentGame?.time2 : this.currentGame?.time1;

    if (loser) {
      // Retira os dois primeiros times da fila
      this.times.shift(); // Remove o time1
      this.times.shift(); // Remove o time2

      // Coloca o vencedor de volta ao início e o perdedor no final
      this.times.unshift(winner);
      this.times.push(loser);
    }

    // Configura o próximo jogo
    this.setupNextGame();
  }
}

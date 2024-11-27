import { Component, Input, OnInit } from '@angular/core';
import { CronometroComponent } from "../cronometro/cronometro.component";
import { timeResponse } from '../../types/time-response.type';
import { CommonModule } from '@angular/common';
import { GerenciarService } from '../../services/gerenciar.service';
import { Router } from '@angular/router';
import { PartidasService } from '../../services/partidas.service';


interface Partida {
  time1: any,
  pontuacaoTime1: any,
  historicoPontuacaoTime1: any,
  time2: any,
  pontuacaoTime2: any,
  historicoPontuacaoTime2: any
} 
@Component({
  selector: 'app-partidas',
  standalone: true,
  imports: [CronometroComponent, CommonModule],
  templateUrl: './partidas.component.html',
  styleUrl: './partidas.component.css'
})
export class PartidasComponent implements OnInit {
  times: timeResponse[] = [];
  time1!: any;
  time2!: any;

  pontuacaoTime1: number = 0; 
  pontuacaoTime2: number = 0; 
  // pontuacaoTotalTimes: { [key: string]: number } = {};
  pontuacaoTimesPartidas: Partida[] = [];
  
  @Input()
  idPartida: string = "";
  
  constructor(private service: GerenciarService, private servicePartida: PartidasService  ,private router: Router) {}
  
  ngOnInit(): void {
    this.service.getTimesPartidas(this.idPartida).subscribe({
      next: (res) => {
        this.times = res;
        console.log(this.times);

        if (this.times.length >= 2){
          this.inicializarTimes();
        }

      },
      error: (error) => {
        console.error(error);
      },
    });

  }

  inicializarTimes() {
      this.time1 = this.times.shift(); 
      this.time2 = this.times.shift(); 
  }


  incrementarPlacar(time: number) {
    if (time === 1) {
      this.pontuacaoTime1++;
    } else if (time === 2) {
      this.pontuacaoTime2++;
    }
  }

  decrementarPlacar(time: number) {
    if (time === 1 && this.pontuacaoTime1 > 0) {
      this.pontuacaoTime1--;
    } else if (time === 2 && this.pontuacaoTime2 > 0) {
      this.pontuacaoTime2--;
    }
  }

  finalizarTodasAsPartidas() {
    let pontosTotais: any[] = [];
    for (let partida of this.pontuacaoTimesPartidas) {
      let pontosTime1 = partida.pontuacaoTime1;
      let pontosTime2 = partida.pontuacaoTime2;
  
      // Atualiza os pontos totais de cada time
      this.atualizarPontuacaoHistorica(partida.time1.nomeTime, pontosTime1);
      this.atualizarPontuacaoHistorica(partida.time2.nomeTime, pontosTime2);
  
      // Adiciona os pontos totais aos times no formato esperado
      pontosTotais.push(
        {
          idTimePartida: partida.time1.idTimePartida,  // Supondo que você tenha `idTimePartida` em `time1` 
          nomeTime: partida.time1.nomeTime,
          totalPontos: partida.historicoPontuacaoTime1,
          partida: {
            idPartida: this.idPartida  // Aqui é o ID da partida que você tem
          }
        },
        {
          idTimePartida: partida.time2.idTimePartida,  // Supondo que você tenha `idTimePartida` em `time2`
          nomeTime: partida.time2.nomeTime,
          totalPontos: partida.historicoPontuacaoTime2,
          partida: {
            idPartida: this.idPartida  // Aqui é o ID da partida que você tem
          }
        }
      );
    }
  
    // Envia os pontos totais para o back-end
    this.service.atualizarTimes(pontosTotais).subscribe({
      next: (response) => {
        this.servicePartida.finalizarPartida(this.idPartida).subscribe({
          next: (responste) =>{

          },
          error: (error)=>{
            console.log("não mudou")
          }

        }),
        this.router.navigate(["/DetalhesPartida/", this.idPartida]),
        localStorage.clear;
      },
      error: (error) => {
        console.error('Erro ao salvar pontos totais de todas as partidas', error);
      }
    });
  }


  finalizarPartida() {
    // Inicializa os pontos da partida atual
    let pontosTime1 = 0;
    let pontosTime2 = 0;
  
    // Determina o resultado da partida e organiza a lista de times
    if (this.pontuacaoTime1 > this.pontuacaoTime2) {
      // Vitória do time 1: mantém time1 no início, coloca time2 no final
      pontosTime1 = 3; // Vitória
      pontosTime2 = 0; // Derrota
      this.times.unshift(this.time1); // Time 1 permanece no início
      this.times.push(this.time2); // Time 2 vai para o final
    } else if (this.pontuacaoTime2 > this.pontuacaoTime1) {
      // Vitória do time 2: mantém time2 no início, coloca time1 no final
      pontosTime1 = 0; // Derrota
      pontosTime2 = 3; // Vitória
      this.times.unshift(this.time2); // Time 2 permanece no início
      this.times.push(this.time1); // Time 1 vai para o final
    } else {
      // Empate: ambos vão para o final da lista
      pontosTime1 = 1; // Empate
      pontosTime2 = 1; // Empate
      this.times.push(this.time1); // Time 1 vai para o final
      this.times.push(this.time2); // Time 2 vai para o final
    }
  
    // Recupera pontuações acumuladas (historicoPontuacaoTime) do localStorage
    let pontuacaoTimesPartidasSalvas = localStorage.getItem('pontuacaoTimesPartidas');
    if (pontuacaoTimesPartidasSalvas) {
      this.pontuacaoTimesPartidas = JSON.parse(pontuacaoTimesPartidasSalvas);
    }
  
    // Atualiza ou inicializa as pontuações acumuladas no histórico
    let historicoPontuacaoTime1 = this.atualizarPontuacaoHistorica(this.time1.nomeTime, pontosTime1);
    let historicoPontuacaoTime2 = this.atualizarPontuacaoHistorica(this.time2.nomeTime, pontosTime2);
  
    // Salva os resultados da partida atual
    let partida: Partida = {
      time1: this.time1,
      pontuacaoTime1: pontosTime1,
      historicoPontuacaoTime1: historicoPontuacaoTime1,
      time2: this.time2,
      pontuacaoTime2: pontosTime2,
      historicoPontuacaoTime2: historicoPontuacaoTime2,
    };
  
    this.pontuacaoTimesPartidas.push(partida);
    localStorage.setItem('pontuacaoTimesPartidas', JSON.stringify(this.pontuacaoTimesPartidas));
  
    // Reseta os placares para a próxima partida
    this.inicializarTimes();
    this.pontuacaoTime1 = 0;
    this.pontuacaoTime2 = 0;
  }
  
  // Atualiza ou inicializa a pontuação acumulada de um time no histórico
  atualizarPontuacaoHistorica(nomeTime: string, pontos: number): number {
    let historico = this.pontuacaoTimesPartidas.find(p => p.time1.nomeTime === nomeTime || p.time2.nomeTime === nomeTime);
    
    if (historico) {
      if (historico.time1.nomeTime === nomeTime) {
        historico.historicoPontuacaoTime1 += pontos;
        return historico.historicoPontuacaoTime1;
      } else if (historico.time2.nomeTime === nomeTime) {
        historico.historicoPontuacaoTime2 += pontos;
        return historico.historicoPontuacaoTime2;
      }
    }
  
    return pontos; // Caso seja o primeiro registro desse time
  }

  temTimes():boolean{
    if(this.times.length >= 2){
      return true
    }
    else{
      return false
    }
  }

}
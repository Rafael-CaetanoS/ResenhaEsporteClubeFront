import { Component, Input, OnInit } from '@angular/core';
import { CronometroComponent } from "../cronometro/cronometro.component";
import { timeResponse } from '../../types/time-response.type';
import { CommonModule } from '@angular/common';
import { GerenciarService } from '../../services/gerenciar.service';


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
  
  @Input()
  idPartida: string = "";
  
  constructor(private service: GerenciarService) {}
  
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

  finalizarPartida() {

    if (this.pontuacaoTime1 > this.pontuacaoTime2) {
      this.times.push(this.time2); 
      this.times.unshift(this.time1)
    } else if (this.pontuacaoTime2 > this.pontuacaoTime1) {
      this.times.push(this.time1!);
      this.times.unshift(this.time2)
    } 
    else{
      this.times.push(this.time2!);
      this.times.push(this.time1!);
    }

   this.inicializarTimes()

    this.pontuacaoTime1 = 0;
    this.pontuacaoTime2 = 0;
  }


}

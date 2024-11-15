import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { inscricaoResponse } from '../../types/inscricao-response.Type';
import { FormsModule } from '@angular/forms';
import { CardTimeComponent } from "../card-time/card-time.component";

@Component({
  selector: 'app-sorteio',
  standalone: true,
  imports: [CommonModule, FormsModule, CardTimeComponent],
  templateUrl: './sorteio.component.html',
  styleUrl: './sorteio.component.css'
})
export class SorteioComponent implements OnInit {
@Input()
inscricoes: inscricaoResponse[] = [];
jogadoresPorTime: number = 5;
timesGerados: inscricaoResponse[][] = [];
qtdejogadores = 0

ngOnInit(): void {
  this.qtdejogadores = this.inscricoes.length
}

embaralharArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

sortear(): inscricaoResponse[][] {

  this.timesGerados= []
  const atletasEmbaralhados = this.embaralharArray(this.inscricoes);

  for (let i = 0; i < atletasEmbaralhados.length; i += this.jogadoresPorTime) {
    const time = atletasEmbaralhados.slice(i, i + this.jogadoresPorTime);
    this.timesGerados.push(time);
  }
  console.log(this.timesGerados);
  return this.timesGerados;
}

incrementar() {
    this.jogadoresPorTime++;

}

decrementar() {
  if(this.jogadoresPorTime == 0){
    this.jogadoresPorTime;
  }
  else{
    this.jogadoresPorTime--;
  }
}
}

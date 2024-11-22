import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { inscricaoResponse } from '../../types/inscricao-response.Type';
import { FormsModule } from '@angular/forms';
import { CardTimeComponent } from "../card-time/card-time.component";
import { timeResponse } from '../../types/time-response.type';
import { GerenciarService } from '../../services/gerenciar.service';

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
@Input()
idPartida: string ="";

aviso: boolean = false;

constructor(private service: GerenciarService){

}

jogadoresPorTime: number = 5;
timesGerados: timeResponse[] = [];
qtdejogadores = 0;
timesCadastrados: timeResponse[]=[]

ngOnInit(): void {
  this.qtdejogadores = this.inscricoes.length

  this.service.getTimesPartidas(this.idPartida).subscribe({
    next: (res) => {
      this.timesCadastrados = res;
      console.log(this.timesCadastrados)
    },
    error: (error) => {
      console.error( error);
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

  this.timesGerados= []
  const atletasEmbaralhados = this.embaralharArray(this.inscricoes);

  for (let i = 0; i < atletasEmbaralhados.length; i += this.jogadoresPorTime) {
    const time = atletasEmbaralhados.slice(i, i + this.jogadoresPorTime);
    const mapearTime: timeResponse = {
      nomeTime: `Time - ${i +1} `,
      partida:{
        idPartida: this.idPartida
      },

      jogadores: time.map(atleta => ({
        inscricao: {
            idInscricao: atleta.idInscricao,
            atleta:{
              nomeAtleta: atleta.atleta.nomeAtleta
            }
        }
    }))
    }
    
    this.timesGerados.push(mapearTime);
  }
  console.log(this.timesGerados);
  return this.timesGerados;
}

incrementar() {
    this.jogadoresPorTime++;

}

decrementar() {
  if(this.jogadoresPorTime == 1){
    this.jogadoresPorTime;
  }
  else{
    this.jogadoresPorTime--;
  }
}

salvar() {
  this.aviso =false
  if(this.timesGerados.length < 2){
    this.aviso = true;
    return
  }

  this.service.salvarPartidas(this.timesGerados).subscribe({
    next: (res) => {
      console.log('Times cadastrados com sucesso:', res);
      alert('Times cadastrados com sucesso!');
    },
    error: (error) => {
      console.error('Erro ao cadastrar os times:', error);
      alert('Erro ao cadastrar os times. Verifique os dados e tente novamente.');
    },
  });
} 
}

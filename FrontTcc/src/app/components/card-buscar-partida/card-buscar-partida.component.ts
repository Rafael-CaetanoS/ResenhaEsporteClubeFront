import { CommonModule } from '@angular/common';
import { Component, input, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'stream';


@Component({
  selector: 'app-card-buscar-partida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-buscar-partida.component.html',
  styleUrls: ['./card-buscar-partida.component.css'] 
})
export class CardBuscarPartidaComponent implements OnInit{
@Input()
titulo:string =""
@Input()
data:string=""
@Input()
horario:string =""
@Input()
local:string =""
@Input()
idEsporte:string =""
imagem:string=""
@Input()
nomeEsporte:string =""

constructor(){}

ngOnInit(): void {
  this.setarImagem()
}

setarImagem(){
  if(this.idEsporte =="1"){
    this.imagem = "bolaFut.png"
  }
  else if(this.idEsporte =="2"){
    this.imagem = "bolaBas.png"
  }
  else if(this.idEsporte =="3"){
     this.imagem = "bolaFutVol.png"
  }
  else{
     this.imagem = "bolaVol.png"
  }
}

}

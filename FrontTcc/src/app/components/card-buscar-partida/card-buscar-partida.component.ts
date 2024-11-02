import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';




@Component({
  selector: 'app-card-buscar-partida',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './card-buscar-partida.component.html',
  styleUrls: ['./card-buscar-partida.component.css'] 
})
export class CardBuscarPartidaComponent implements OnInit{
urlAtual: string = '';

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

constructor(private router: Router){}

ngOnInit(): void {
  this.setarImagem()
  this.urlAtual = this.router.url;
}

routeBusar(): boolean {
  return this.urlAtual.includes('/Buscarpartida');
}
routeMinhas(): boolean {
  return this.urlAtual === '/MinhasPartidas';
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

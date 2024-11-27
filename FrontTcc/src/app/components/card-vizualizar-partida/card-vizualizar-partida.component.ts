import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselComponent } from '../carousel/carousel.component';
import { InscricaoService } from '../../services/inscricao.service';
import { inscricaoResponse } from '../../types/inscricao-response.Type';

@Component({
  selector: 'app-card-vizualizar-partida',
  standalone: true,
  imports: [CarouselComponent, CommonModule,RouterLink],
  templateUrl: './card-vizualizar-partida.component.html',
  styleUrl: './card-vizualizar-partida.component.css'
})
export class CardVizualizarPartidaComponent implements OnInit {
@Input()
idPartida:string =""
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

incritos: inscricaoResponse[] =[]

constructor(private service: InscricaoService){

}

ngOnInit(): void {
  this.service.getInscritosPartidas(this.idPartida).subscribe({
    next: (response) =>{
      this.incritos = response;
      console.log("deu bom")
    },
    error: (error) =>{
      console.log(error)
    }
  }) 
}
}

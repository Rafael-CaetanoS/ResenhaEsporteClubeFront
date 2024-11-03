import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-card-detalhes-partida',
  standalone: true,
  imports: [CarouselComponent, CommonModule,RouterLink],
  templateUrl: './card-detalhes-partida.component.html',
  styleUrl: './card-detalhes-partida.component.css'
})
export class CardDetalhesPartidaComponent {

@Input()
titulo:string ="sla"
@Input()
data:string="201914556"
@Input()
horario:string =""
@Input()
local:string ="zezin"
@Input()
idEsporte:string =""
imagem:string=""
@Input()
nomeEsporte:string ="fut"


}

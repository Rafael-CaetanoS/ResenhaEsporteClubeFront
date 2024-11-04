import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-card-vizualizar-partida',
  standalone: true,
  imports: [CarouselComponent, CommonModule,RouterLink],
  templateUrl: './card-vizualizar-partida.component.html',
  styleUrl: './card-vizualizar-partida.component.css'
})
export class CardVizualizarPartidaComponent {
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

}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardDetalhesPartidaComponent } from "../../components/card-detalhes-partida/card-detalhes-partida.component";
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-detalhes-partida',
  standalone: true,
  imports: [SidebarComponent, CardDetalhesPartidaComponent, RouterLink,CarouselComponent,CommonModule],
  templateUrl: './detalhes-partida.component.html',
  styleUrl: './detalhes-partida.component.css'
})
export class DetalhesPartidaComponent {

@Input()
titulo:string ="PELADA DOS AMIGOS"
@Input()
data:string="20241101"
@Input()
horario:string =""
@Input()
local:string ="sintetico do homi"
@Input()
idEsporte:string =""
imagem:string=""
@Input()
nomeEsporte:string ="Futebol"

}

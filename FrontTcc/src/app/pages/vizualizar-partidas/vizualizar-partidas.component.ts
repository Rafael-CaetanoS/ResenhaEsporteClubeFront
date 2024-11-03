import { Component } from '@angular/core';
import { CardVizualizarPartidaComponent } from '../../components/card-vizualizar-partida/card-vizualizar-partida.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-vizualizar-partidas',
  standalone: true,
  imports: [SidebarComponent,CardVizualizarPartidaComponent,CarouselComponent],
  templateUrl: './vizualizar-partidas.component.html',
  styleUrl: './vizualizar-partidas.component.css'
})
export class VizualizarPartidasComponent {

}

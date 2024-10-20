import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { CardBuscarPartidaComponent } from "../../components/card-buscar-partida/card-buscar-partida.component";

@Component({
  selector: 'app-buscar-partida',
  standalone: true,
  imports: [SidebarComponent, CardBuscarPartidaComponent],
  templateUrl: './buscar-partida.component.html',
  styleUrl: './buscar-partida.component.css'
})
export class BuscarPartidaComponent {

}

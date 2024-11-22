import { Component, OnInit } from '@angular/core';
import { CardVizualizarPartidaComponent } from '../../components/card-vizualizar-partida/card-vizualizar-partida.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { PartidasService } from '../../services/partidas.service';
import { PartidaResponse } from '../../types/partida-response.type';
import { CommonModule } from '@angular/common';
import { NavbarprincipalComponent } from "../../components/navbarprincipal/navbarprincipal.component";

@Component({
  selector: 'app-vizualizar-partidas',
  standalone: true,
  imports: [SidebarComponent, CardVizualizarPartidaComponent, CommonModule, NavbarprincipalComponent],
  templateUrl: './vizualizar-partidas.component.html',
  styleUrl: './vizualizar-partidas.component.css'
})
export class VizualizarPartidasComponent implements OnInit{
  partidas: PartidaResponse[] = [];
constructor(private servicePartida: PartidasService){

}

  ngOnInit(): void {
    this.servicePartida.getPartidasInscrito().subscribe({
      next: (res) => {
        this.partidas = res
        .map((item) => ({
          idPartida: item.idPartida,
          titulo: item.titulo,
          descricao: item.descricao,
          horaInicio: item.horaInicio,
          horaFim: item.horaFim,
          data: item.data,
          faixaEtaria: item.faixaEtaria,
          qtdeAtletas: item.qtdeAtletas,
          endereco: item.endereco,
          nomeLocal: item.nomeLocal,
          cidade: item.cidade,
          atleta: {
            idAtleta: item.atleta.idAtleta,
            nomeAtleta: item.atleta.nomeAtleta,
          },
          esporte: {
            idEsporte: item.esporte.idEsporte,
            nomeEsporte: item.esporte.nomeEsporte,
          },
          statusPartida:{
            idStatusPartida: "1"
          }
        }));
        console.log(this.partidas);
      },
      error: (err) => console.log(err),
    });
  }
}

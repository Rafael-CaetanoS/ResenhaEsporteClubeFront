import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { PartidaResponse } from '../../types/partida-response.type';
import { PartidasService } from '../../services/partidas.service';
import { InscricaoService } from '../../services/inscricao.service';
import { inscricaoResponse } from '../../types/inscricao-response.Type';
import { NavbarprincipalComponent } from "../../components/navbarprincipal/navbarprincipal.component";

@Component({
  selector: 'app-detalhes-partida',
  standalone: true,
  imports: [SidebarComponent, RouterLink, CarouselComponent, CommonModule, NavbarprincipalComponent],
  templateUrl: './detalhes-partida.component.html',
  styleUrl: './detalhes-partida.component.css'
})
export class DetalhesPartidaComponent implements OnInit {

partida!: PartidaResponse;
inscricoes: inscricaoResponse[] = [];
idUrl: string =""
times: any [] =[]

constructor(private servicePartida: PartidasService, private serviceInscritos: InscricaoService, private route: ActivatedRoute){

}

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      const id = value.get("id");
      if (id) {
        this.idUrl = id;
        this.servicePartida.getPartidaById(this.idUrl).subscribe({
          next: partida => (this.partida = partida),
          error: err => console.error('Erro ao buscar partida:', err)
        });
      }
      else{
        console.log("partida não encontrada")
      }
    });

    this.serviceInscritos.getInscritosPartidas(this.idUrl).subscribe({
      next: inscricoes => {
        this.inscricoes = inscricoes;
      },
      error: err => console.error('Não há inscrições', err)
    });

  }
}

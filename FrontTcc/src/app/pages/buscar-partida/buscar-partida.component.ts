import { Component, OnInit, Output } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { CardBuscarPartidaComponent } from "../../components/card-buscar-partida/card-buscar-partida.component";
import { PartidaResponse } from '../../types/partida-response.type';
import { PartidasService } from '../../services/partidas.service';
import { CommonModule } from '@angular/common';
import { EsportesService } from '../../services/esportes.service';
import { EsporteResponse } from '../../types/esportes-response.type';
import { ModalComponent } from '../../components/modal/modal.component';


@Component({
  selector: 'app-buscar-partida',
  standalone: true,
  imports: [SidebarComponent, CardBuscarPartidaComponent, CommonModule, ModalComponent],
  templateUrl: './buscar-partida.component.html',
  styleUrls: ['./buscar-partida.component.css']
})
export class BuscarPartidaComponent implements OnInit {
  partidas: PartidaResponse[] = [];
  esporte: EsporteResponse [] =[]; 
  partidasFiltradas: PartidaResponse[] = [];
  partidasParaExibir: PartidaResponse[] = [];

  mostrarModal = false;
  partidaSelecionada: PartidaResponse | null = null;
  dataAtual = new Date();

  constructor(private service: PartidasService, private serviceEsporte: EsportesService) {
  }

  ngOnInit(): void {
    this.serviceEsporte.getEsportes().subscribe({
      next:(res)=>{
        this.esporte = res.map((item) =>({
          idEsporte:item.idEsporte,
          nomeEsporte: item.nomeEsporte
        })
        )
      }
    })


    

    this.service.getPartidas().subscribe({
      next: (res) => {
        this.partidas = res
        this.partidasParaExibir = res
        .filter((item) => new Date(item.data) >= this.dataAtual)
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
          atleta: {
            idAtleta: item.atleta.idAtleta,
            nomeAtleta: item.atleta.nomeAtleta,
          },
          esporte: {
            idEsporte: item.esporte.idEsporte,
            nomeEsporte: item.esporte.nomeEsporte,
          },
        }));
        console.log(this.partidas);
      },
      error: (err) => console.log(err),
    });
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.partidasFiltradas = this.partidas.filter((partida) =>
      partida.titulo.toLowerCase().trim().includes(query) 
    );

    this.partidasParaExibir = query ? this.partidasFiltradas.filter((partida) =>new Date(partida.data) >= this.dataAtual) : this.partidas.filter((partida) =>new Date(partida.data) >= this.dataAtual);
  }

  abrirModal(partida: PartidaResponse) {
    this.partidaSelecionada = partida;
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
    this.partidaSelecionada = null;
  }
}

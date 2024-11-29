import { Component, Input, OnInit } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { InscricaoService } from '../../services/inscricao.service';
import { PartidasService } from '../../services/partidas.service';
import { CommonModule } from '@angular/common';
import { PartidaResponse } from '../../types/partida-response.type';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { inscricaoResponse } from '../../types/inscricao-response.Type';
import { SorteioComponent } from "../../components/sorteio/sorteio.component";
import { NavbarprincipalComponent } from "../../components/navbarprincipal/navbarprincipal.component";
import { PartidasComponent } from "../../components/partidas/partidas.component";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gerenciar-partidas',
  standalone: true,
  imports: [SidebarComponent, CommonModule, SorteioComponent, NavbarprincipalComponent, PartidasComponent, RouterLink ],
  templateUrl: './gerenciar-partidas.component.html',
  styleUrls: ['./gerenciar-partidas.component.css', './partidas.css']
})
export class GerenciarPartidasComponent implements OnInit {
  activeTab: string = 'editar';
  partida: PartidaResponse = {
    esporte: { nomeEsporte: '' },
    statusPartida: { idStatusPartida: '' },
    atleta: {idAtleta: ''}
  } as PartidaResponse;
  
  inscricoes: inscricaoResponse[] = [];
  idUrl: string = "";

  mostrarModal = false;

  constructor(
    private serviceInscricao: InscricaoService,
    private servicePartida: PartidasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      const id = value.get("id");
      if (id) {
        this.idUrl = id;

        this.servicePartida.getPartidaById(this.idUrl).subscribe({
          next: partida => (this.partida = partida),
          error: err => console.error('Erro ao buscar partida:', err)
        });

        this.serviceInscricao.getInscritosPartidas(this.idUrl).subscribe({
          next: inscricoes => {
            this.inscricoes = inscricoes;
          },
          error: err => console.error('Não há inscrições', err)
        });
      } else {
        console.error("ID não encontrado na URL");
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  cancelarPartida(){
        this.servicePartida.cancelarPartida(this.idUrl).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Partida cancelada!',
              text: 'Sua partida foi cancelada com sucesso.',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate([`/MinhasPartidas`]);
            });


          },
          error: err => console.error('Erro ao buscar partida:', err)
        });
  }
}

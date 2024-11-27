import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { PartidaResponse } from '../../types/partida-response.type';
import { PartidasService } from '../../services/partidas.service';
import { InscricaoService } from '../../services/inscricao.service';
import { inscricaoResponse } from '../../types/inscricao-response.Type';
import { NavbarprincipalComponent } from "../../components/navbarprincipal/navbarprincipal.component";
import Swal from 'sweetalert2';
import { GerenciarService } from '../../services/gerenciar.service';
import { response } from 'express';
import { timeResponse } from '../../types/time-response.type';


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
idUrl: string ="";
times: timeResponse [] =[];
idAtleta: string | null = null;
mostrarModal = false;

constructor(private servicePartida: PartidasService, private serviceInscritos: InscricaoService, private route: ActivatedRoute,     
  private router: Router, private serviceTime: GerenciarService){

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

    this.retornaTimes();
    const timeComMaisPontos = this.getTimeComMaisPontos();
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  sumirBotao(){
    if (typeof window !== 'undefined') {
      this.idAtleta = sessionStorage.getItem('idAtleta');
        if( this.partida.statusPartida.idStatusPartida =="2" ||  this.idAtleta == this.partida.atleta.idAtleta){
          return false;
        }    
    }
    return true;
  }

  cancelarinscricao(){
    if (typeof window !== 'undefined') {
      this.idAtleta = sessionStorage.getItem('idAtleta');
      console.log(this.idAtleta);
    }
    for (var inscricao of this.inscricoes) {
      if(inscricao.atleta.idAtleta == this.idAtleta){
        let idInscricao = inscricao.idInscricao;
        this.serviceInscritos.cancelarInscricao(idInscricao).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Inscrição cancelada!',
              text: 'Aperte "ok" para continuar',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate([`/Vizualizarpartida`]);
            })
          },
          error: err => console.error('Erro ao buscar partida:', err)
          
        });
      }
      else{
        console.log("parou aqui")
      }
    }
  }

  retornaTimes() {
    this.serviceTime.getTimesPartidas(this.idUrl).subscribe({
      next: (response) => {
        this.times = response.sort((a, b) => Number(b.totalPontos) - Number(a.totalPontos));
      },
      error: (erro) => {
        console.error("Erro ao buscar os times:", erro);
      }
    });
  }
  getTimeComMaisPontos(): timeResponse | undefined {
    if (!this.times || this.times.length === 0) {
      console.warn('A lista de times está vazia ou indefinida.');
      return undefined;
    }
  
    return this.times.reduce((maiorTime, timeAtual) => {
      return Number(timeAtual.totalPontos) > Number(maiorTime.totalPontos) ? timeAtual : maiorTime;
    });
  }
}

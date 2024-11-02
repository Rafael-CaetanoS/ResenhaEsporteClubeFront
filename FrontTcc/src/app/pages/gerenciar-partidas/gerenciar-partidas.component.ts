import { Component, Input, OnInit } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { InscricaoService } from '../../services/inscricao.service';
import { PartidasService } from '../../services/partidas.service';
import { CommonModule } from '@angular/common';
import { PartidaResponse } from '../../types/partida-response.type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gerenciar-partidas',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './gerenciar-partidas.component.html',
  styleUrl: './gerenciar-partidas.component.css'
})
export class GerenciarPartidasComponent implements OnInit{

  partida!: PartidaResponse 
  idUrl: string =""

constructor(private serviceInscricao: InscricaoService, private servicePartida: PartidasService, private route:ActivatedRoute){}

ngOnInit(): void {
  this.route.paramMap.subscribe(value => {
    const id = value.get("id");
    if (id) {
      this.idUrl = id;

      this.servicePartida.getPartidaById(`${this.idUrl}`).subscribe({
        next: partida => (this.partida = partida),
        error: err => console.error('Erro ao buscar partida:', err)
      });
    } else {
      console.error("ID não encontrado na URL");
    }
  })
  }
}
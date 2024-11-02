import { Component, Input, OnInit } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { InscricaoService } from '../../services/inscricao.service';
import { PartidasService } from '../../services/partidas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gerenciar-partidas',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './gerenciar-partidas.component.html',
  styleUrl: './gerenciar-partidas.component.css'
})
export class GerenciarPartidasComponent implements OnInit{

@Input()
titulo:string="";
@Input()
data:string="";
@Input()
horaInicio:string="";
@Input()
horaFim:string="";
@Input()
local:string="";
@Input()
esporte:string="";
@Input()
nomeAtleta:string="";

constructor(private serviceInscricao: InscricaoService, private servicePartida: PartidasService){}

ngOnInit(): void {
 
}

}

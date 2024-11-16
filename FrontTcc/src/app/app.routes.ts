import { Routes } from '@angular/router';
import { BuscarPartidaComponent } from './pages/buscar-partida/buscar-partida.component';
import { CadastrarAtletaComponent } from './pages/cadastrar-atleta/cadastrar-atleta.component';
import { CriarPartidaComponent } from './pages/criar-partida/criar-partida.component';
import { DetalhesPartidaComponent } from './pages/detalhes-partida/detalhes-partida.component';
import { GerenciarPartidasComponent } from './pages/gerenciar-partidas/gerenciar-partidas.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { MinhaPartidasComponent } from './pages/minhas-partidas/minhas-partidas.component';
import { VizualizarPartidasComponent } from './pages/vizualizar-partidas/vizualizar-partidas.component';

export const routes: Routes = [
    {path: '', 
        component: LoginComponent
    },

    {
        path:'Inicio', component : InicioComponent
    },

    {
        path:'Cadastraratleta', component : CadastrarAtletaComponent
    },

    {
        path:'Login', component : LoginComponent
    },

    {
        path:'Criarpartida', component : CriarPartidaComponent
    },
    {
        path:'Buscarpartida', component : BuscarPartidaComponent
    },

    {
        path:'Vizualizarpartida', component : VizualizarPartidasComponent
    },
    
    {
        path:'GerenciarPartidas/:id', component : GerenciarPartidasComponent
    },

    {
        path:'MinhasPartidas', component : MinhaPartidasComponent
    },
    
    {
        path:'DetalhesPartida/:id', component : DetalhesPartidaComponent
    }
];

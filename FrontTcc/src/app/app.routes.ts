import { Routes } from '@angular/router';
import { BuscarPartidaComponent } from './pages/buscar-partida/buscar-partida.component';
import { CadastrarAtletaComponent } from './pages/cadastrar-atleta/cadastrar-atleta.component';
import { CriarPartidaComponent } from './pages/criar-partida/criar-partida.component';
import { GerenciarPartidasComponent } from './pages/gerenciar-partidas/gerenciar-partidas.component';
import { HomeComponent } from './pages/home/home.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { VizualizarPartidasComponent } from './pages/vizualizar-partidas/vizualizar-partidas.component';

export const routes: Routes = [
    {path: '', 
        component: HomeComponent
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
        path:'gerenciarPartidas', component : GerenciarPartidasComponent
    }




    
    


];

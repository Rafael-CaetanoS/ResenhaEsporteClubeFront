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
import { EditarComponent } from './components/editar/editar.component';
import { authGuard } from './guards/auth.guard';
import { gerenciarGuard } from './guards/gerenciar.guard';
import { inscritoGuard } from './guards/inscrito.guard';

export const routes: Routes = [
    {path: '', 
        component: LoginComponent
    },

    {
        path:'Inicio', component : InicioComponent, canActivate: [authGuard]
    },

    {
        path:'Cadastraratleta', component : CadastrarAtletaComponent 
    },

    {
        path:'Criarpartida', component : CriarPartidaComponent, canActivate: [authGuard]
    },
    {
        path:'Buscarpartida', component : BuscarPartidaComponent, canActivate: [authGuard]
    },

    {
        path:'Historico', component : VizualizarPartidasComponent, canActivate: [authGuard]
    },
    
    {
        path:'GerenciarPartidas/:id', component : GerenciarPartidasComponent, canActivate: [authGuard, gerenciarGuard]
    },

    {
        path:"GerenciarPartidas/Editar/:id", component:EditarComponent, canActivate: [authGuard, gerenciarGuard]
    },

    {
        path:'MinhasPartidas', component : MinhaPartidasComponent, canActivate: [authGuard]
    },
    
    {
        path:'DetalhesPartida/:id', component : DetalhesPartidaComponent, canActivate: [authGuard, inscritoGuard]
    },
    { path: '**', redirectTo: '' }
];

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastrarAtletaComponent } from './pages/cadastrar-atleta/cadastrar-atleta.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CriarPartidaComponent } from './pages/criar-partida/criar-partida.component';

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
    }


    
    


];

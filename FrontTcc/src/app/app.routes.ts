import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastrarAtletaComponent } from './pages/cadastrar-atleta/cadastrar-atleta.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {path: '', 
        component: HomeComponent
    },

    {
        path:'Cadastraratleta', component : CadastrarAtletaComponent
    },

    {
        path:'Login', component : LoginComponent
    }



];

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastrarAtletaComponent } from './pages/cadastrar-atleta/cadastrar-atleta.component';

export const routes: Routes = [
    {path: '', 
        component: HomeComponent
    },

    {
        path:'cadastraratleta', component : CadastrarAtletaComponent
    }


];

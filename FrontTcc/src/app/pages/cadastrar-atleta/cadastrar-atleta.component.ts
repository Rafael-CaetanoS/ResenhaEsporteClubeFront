import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-cadastrar-atleta',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './cadastrar-atleta.component.html',
  styleUrl: './cadastrar-atleta.component.css'
})
export class CadastrarAtletaComponent {

}

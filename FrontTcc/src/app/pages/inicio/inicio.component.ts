import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardComponent } from '../../components/card/card.component';
import { NavbarprincipalComponent } from "../../components/navbarprincipal/navbarprincipal.component";


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [SidebarComponent, CardComponent, NavbarprincipalComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}

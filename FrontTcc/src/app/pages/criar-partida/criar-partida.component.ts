import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-criar-partida',
  standalone: true,
  imports: [SidebarComponent, RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './criar-partida.component.html',
  styleUrl: './criar-partida.component.css'
})
export class CriarPartidaComponent {
  formParida!: FormGroup;

  postar() {
    if (!this.formParida.valid) {
      console.log('Formulário inválido');
      return;
    }
    console.log('Formulário válido', this.formParida.value);
  }
}

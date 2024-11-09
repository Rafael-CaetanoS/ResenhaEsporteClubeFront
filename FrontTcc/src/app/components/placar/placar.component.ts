import { Component } from '@angular/core';

@Component({
  selector: 'app-placar',
  standalone: true,
  imports: [],
  templateUrl: './placar.component.html',
  styleUrl: './placar.component.css'
})
export class PlacarComponent {
  pontuacaoTime1: number = 0;
  pontuacaoTime2: number = 0;

  // Funções para manipular o placar
  incrementarPlacar(time: number) {
    if (time === 1) {
      this.pontuacaoTime1++;
    } else if (time === 2) {
      this.pontuacaoTime2++;
    }
  }

  decrementarPlacar(time: number) {
    if (time === 1 && this.pontuacaoTime1 > 0) {
      this.pontuacaoTime1--;
    } else if (time === 2 && this.pontuacaoTime2 > 0) {
      this.pontuacaoTime2--;
    }
  }
}

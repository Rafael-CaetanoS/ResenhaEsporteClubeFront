import { Component } from '@angular/core';

@Component({
  selector: 'app-cronometro',
  standalone: true,
  imports: [],
  templateUrl: './cronometro.component.html',
  styleUrl: './cronometro.component.css'
})
export class CronometroComponent {
  tempo: number = 0; 
  minutos: string = '00';
  segundos: string = '00';
  intervalo: any;
  cronometroAtivo: boolean = false;

  // Formata o tempo em "MM:SS"
  atualizarTempoDisplay() {
    const min = Math.floor(this.tempo / 60);
    const sec = this.tempo % 60;

    this.minutos = String(min).padStart(2, '0');
    this.segundos = String(sec).padStart(2, '0');
  }

  // Iniciar cronômetro
  iniciarCronometro() {
    if (!this.cronometroAtivo) {
      this.cronometroAtivo = true;
      this.intervalo = setInterval(() => {
        this.tempo++;
        this.atualizarTempoDisplay();
      }, 1000);
    }
  }

  // Pausar cronômetro
  pausarCronometro() {
    if (this.cronometroAtivo) {
      clearInterval(this.intervalo);
      this.cronometroAtivo = false;
    }
  }

  // Resetar cronômetro
  resetarCronometro() {
    this.pausarCronometro();
    this.tempo = 0;
    this.atualizarTempoDisplay();
  }
}

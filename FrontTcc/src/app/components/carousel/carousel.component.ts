import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { inscricaoResponse } from '../../types/inscricao-response.Type';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() inscritos: inscricaoResponse[] = []; // Recebe a lista de inscritos via @Input
  currentIndex: number = 0;

  ngOnInit(): void {
    // Se precisar, inicialize ou manipule a lista de inscritos aqui
  }

  // Método para exibir cinco slides em loop infinito
  get visibleSlides(): inscricaoResponse[] {
    const totalSlides = this.inscritos.length;
    if (totalSlides === 0) return [];

    const indices = [
      (this.currentIndex - 2 + totalSlides) % totalSlides,
      (this.currentIndex - 1 + totalSlides) % totalSlides,
      this.currentIndex,
      (this.currentIndex + 1) % totalSlides,
      (this.currentIndex + 2) % totalSlides
    ];

    return indices.map(index => this.inscritos[index]);
  }

  // Navega para o slide anterior
  prevSlide(): void {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.inscritos.length - 1;
  }

  // Navega para o próximo slide
  nextSlide(): void {
    this.currentIndex = (this.currentIndex < this.inscritos.length - 1) ? this.currentIndex + 1 : 0;
  }

  // Retorna a primeira letra do nome do atleta
  getInitial(nome: string): string {
    return nome ? nome.charAt(0).toUpperCase() : '';
  }
}

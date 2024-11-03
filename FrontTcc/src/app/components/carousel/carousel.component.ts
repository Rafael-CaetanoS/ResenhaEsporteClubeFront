import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  slides: string[] = [
    '../../../assets/images/bolaBas.png',
    '../../../assets/images/bolaFut.png',
    '../../../assets/images/perfil.png',
    '../../../assets/images/bolaFutVol.png',
    '../../../assets/images/bolaVol.png'
  ];
  currentIndex: number = 0;

  // Método para exibir cinco slides em loop infinito
  get visibleSlides(): string[] {
    const totalSlides = this.slides.length;
    const prevIndex1 = (this.currentIndex - 2 + totalSlides) % totalSlides;
    const prevIndex2 = (this.currentIndex - 1 + totalSlides) % totalSlides;
    const nextIndex1 = (this.currentIndex + 1) % totalSlides;
    const nextIndex2 = (this.currentIndex + 2) % totalSlides;
    
    return [
      this.slides[prevIndex1],
      this.slides[prevIndex2],
      this.slides[this.currentIndex],
      this.slides[nextIndex1],
      this.slides[nextIndex2]
    ];
  }

  // Navega para o slide anterior
  prevSlide(): void {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.slides.length - 1;
  }

  // Navega para o próximo slide
  nextSlide(): void {
    this.currentIndex = (this.currentIndex < this.slides.length - 1) ? this.currentIndex + 1 : 0;
  }
}

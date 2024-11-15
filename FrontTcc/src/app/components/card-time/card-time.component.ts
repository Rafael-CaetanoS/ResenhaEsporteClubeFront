import { Component, Input } from '@angular/core';
import { inscricaoResponse } from '../../types/inscricao-response.Type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-time.component.html',
  styleUrl: './card-time.component.css'
})
export class CardTimeComponent {
  @Input() times: any[] = []; 

}

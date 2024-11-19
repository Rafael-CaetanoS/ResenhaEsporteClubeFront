import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { timeResponse } from '../../types/time-response.type';

@Component({
  selector: 'app-card-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-time.component.html',
  styleUrl: './card-time.component.css'
})
export class CardTimeComponent {
  @Input() 
  times: timeResponse[] = []; 

}

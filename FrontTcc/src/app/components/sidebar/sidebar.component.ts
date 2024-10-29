import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  
  nomeAtleta: string | null = null;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.nomeAtleta = sessionStorage.getItem('name');
    }
  }
}

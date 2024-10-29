import { Component, Input } from '@angular/core';
import { InscricaoService } from '../../services/inscricao.service';
import { inscricaoResponse } from '../../types/inscricao-response.Type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input()
  titulo:string =''

  @Input()
  descricao:string =''

  @Input()
  imagem:string =''

  @Input()
  data:string =''

  @Input()
  horaInicio:string =''

  @Input()
  horaFim:string =''

  @Input()
  organizador:string =''

  @Input()
  idEsporte:string =''

  @Input()
  idPartida:string=''

  idAtleta: string | null = null;
constructor(private service: InscricaoService){

}

  inscrever(){
    if (typeof window !== 'undefined') {
      this.idAtleta = sessionStorage.getItem('idAtleta');
    }

    const inscricaoData: inscricaoResponse = {
      atleta: { 
        idAtleta: this.idAtleta ? this.idAtleta : '',  
      },
      partida: {
        idPartida: this.idPartida
      }
    };
  
    this.service.postInscricao(inscricaoData).subscribe({
      next: (response) => {
        console.log('Cadastro realizado com sucesso:', response);
        alert('Cadastro realizado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar. Tente novamente mais tarde.');
      }
    });
  }
}

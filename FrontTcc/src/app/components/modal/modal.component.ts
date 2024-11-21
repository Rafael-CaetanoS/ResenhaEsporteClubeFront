import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InscricaoService } from '../../services/inscricao.service';
import { inscricaoResponse } from '../../types/inscricao-response.Type';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit{
  @Input() titulo:string ='';

  @Input() descricao:string ='';

  @Input() data:string ='';

  @Input() horaInicio:string ='';

  @Input() horaFim:string ='';

  @Input() organizador:string ='';

  @Input() idEsporte:string ='';

  @Input() idPartida:string='';

  @Input() qtdeAtletas:string = '';

  @Output() closeModal = new EventEmitter<void>(); 

  idAtleta: string | null = null;

  imagem:string ='';

  qtde:number = 0;




constructor(private service: InscricaoService, private router: Router){

}

ngOnInit(): void {
  this.setarImagem();
  this.qtdeInscritos();
}

  inscrever(){
    if (typeof window !== 'undefined') {
      this.idAtleta = sessionStorage.getItem('idAtleta');
    }

    const inscricaoData: inscricaoResponse = {
      idInscricao: "",
      atleta: { 
        idAtleta: this.idAtleta ? this.idAtleta : '',  
        nomeAtleta:''
      },
      partida: {
        idPartida: this.idPartida
      }
    };
  
    this.service.postInscricao(inscricaoData).subscribe({
      next: (response) => {
        console.log('Cadastro realizado com sucesso:', response);
        alert('Cadastro realizado com sucesso!');
        this.router.navigate([`/DetalhesPartida`, this.idPartida]);
      },
      error: (error) => {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar. Tente novamente mais tarde.');
      }
    });
  }

  onClose() {
    this.closeModal.emit();
  }


  setarImagem(){
    if(this.idEsporte =="1"){
      this.imagem = "futebol.jpg"
    }
    else if(this.idEsporte =="2"){
      this.imagem = "basquete.png"
    }
    else if(this.idEsporte =="3"){
       this.imagem = "futvolei.jpg"
    }
    else{
       this.imagem = "volei.jpg"
    }
  }

  qtdeInscritos(){
    this.service.getInscritosPartidas(this.idPartida).subscribe({
      next: (inscritos) => {
        this.qtde = inscritos.length;
      },
      error: (err) => {
        console.error('Erro ao obter os inscritos:', err); 
      }
    });
  }
}

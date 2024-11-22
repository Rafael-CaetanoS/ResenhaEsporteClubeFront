import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartidaResponse } from '../types/partida-response.type';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {
  private apiUrl = 'http://localhost:8080/partidas';
  private token: string | null = null;
  private idAtleta: string  | null = null

  constructor(private http: HttpClient) {}
  
  /*Busca todas as partidas que não foram criadas pelo atleta*/ 
  getPartidas(): Observable<PartidaResponse[]> {
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('auth-token');
      this.idAtleta = sessionStorage.getItem('idAtleta');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<PartidaResponse[]>(`${this.apiUrl}/retornarPartida/${this.idAtleta}`, { headers });
  }

  /*Busca a partida pelo Id */
  getPartidaById(idPartida: string): Observable<PartidaResponse> {

    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('auth-token');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<PartidaResponse>(`${this.apiUrl}/${idPartida}`, { headers });
  }

  /*Busca as partidas que foram criadas pelo atleta */
  getPartidasAtleta(): Observable<PartidaResponse[]> {
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('auth-token');
      this.idAtleta = sessionStorage.getItem('idAtleta');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<PartidaResponse[]>(`${this.apiUrl}/minhasPartidas/${this.idAtleta}`, { headers });
  }

  getPartidasInscrito(): Observable<PartidaResponse[]> {
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('auth-token');
      this.idAtleta = sessionStorage.getItem('idAtleta');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<PartidaResponse[]>(`${this.apiUrl}/inscricao/${this.idAtleta}`, { headers });
  }


  /* Cria uma partida */
  postPartidas(partidaData: PartidaResponse): Observable<PartidaResponse> {
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('auth-token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      return this.http.post<PartidaResponse>(this.apiUrl, partidaData, { headers });
    }
    // Pode retornar um Observable vazio caso esteja fora do ambiente do navegador.
    return new Observable<PartidaResponse>();
  }

  cancelarPartida(idPartida: string): Observable<any> {

    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('auth-token');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put<any>(`${this.apiUrl}/cancelar/${idPartida}`, {}, { headers });
  }

  atualizarPartida(partidaData: PartidaResponse): Observable<PartidaResponse> {

    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('auth-token');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put<PartidaResponse>(`${this.apiUrl}`, partidaData, { headers });
  }
}

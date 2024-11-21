import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inscricaoResponse } from '../types/inscricao-response.Type';
import { PartidaResponse } from '../types/partida-response.type';

@Injectable({
  providedIn: 'root'
})
export class InscricaoService {
  private apiUrl = 'http://localhost:8080/inscricao';
  private token: string | null = null;

  constructor(private http: HttpClient) {}


  postInscricao(inscricao: inscricaoResponse): Observable <inscricaoResponse[]> {
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('auth-token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      return this.http.post<inscricaoResponse[]>(this.apiUrl, inscricao, { headers });
    }
    return new Observable<inscricaoResponse[]>();
  }

  getInscritosPartidas(idPartida: string): Observable<inscricaoResponse[]> {
    if (typeof window !== 'undefined') {
        this.token = sessionStorage.getItem('auth-token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get<inscricaoResponse[]>(`${this.apiUrl}/partida/${idPartida}`, { headers });
    }
    return new Observable<inscricaoResponse[]>();
  }

  cancelarInscricao(idInscricao: string): Observable<any> {

    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('auth-token');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put<any>(`${this.apiUrl}/cancelar/${idInscricao}`, {}, { headers });
  }

}

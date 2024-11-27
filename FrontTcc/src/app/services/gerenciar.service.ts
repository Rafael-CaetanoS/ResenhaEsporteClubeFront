import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeResponse } from '../types/time-response.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GerenciarService {
  private apiUrl = 'http://localhost:8080';
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  salvarTimes(times: timeResponse[]): Observable<timeResponse[]> {
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('auth-token');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<timeResponse[]>(`${this.apiUrl}/gerenciar`, times, { headers });
  }

  getTimesPartidas(idPartida: string): Observable<timeResponse[]> {
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('auth-token');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<timeResponse[]>(`${this.apiUrl}/gerenciar/${idPartida}`, { headers });
  }

  atualizarTimes(times: timeResponse[]): Observable<timeResponse[]> {
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('auth-token');
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put<timeResponse[]>(`${this.apiUrl}/gerenciar`, times, { headers });
  }

}

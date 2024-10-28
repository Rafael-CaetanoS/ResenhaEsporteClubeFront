import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EsporteResponse } from '../types/esportes-response.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EsportesService {
  private apiUrl = 'http://localhost:8080/esportes';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  getEsportes(): Observable<EsporteResponse[]> {

    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('auth-token');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<EsporteResponse[]>(this.apiUrl, { headers });
  }
}

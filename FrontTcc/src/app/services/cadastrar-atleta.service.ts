import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { atletaResponse } from '../types/atleta-response.type';

@Injectable({
  providedIn: 'root'
})
export class CadastrarAtletaService {
  constructor(private http: HttpClient) { }
  
  private token: string | null = null;
  
  cadastrarAtleta(atletaData: any): Observable<any> {

    return this.http.post('http://localhost:8080/auth/register', atletaData);
  }

  buscarAtleta(id: string) : Observable<atletaResponse>{
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('auth-token');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<atletaResponse>(`http://localhost:8080/atletas/${id}`, { headers });
  }
  

  atualizarAtleta(atletaData: any): Observable<any>{
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('auth-token');
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put('http://localhost:8080/atletas', atletaData, { headers });
  }
}

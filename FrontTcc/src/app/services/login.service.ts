// LoginService.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = `http://localhost:8080/atletas`;

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`http://localhost:8080/auth/login`, { email, senha }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("nome", value.nome);
        sessionStorage.setItem("idAtleta", value.id.toString());
      })
    );
  }
}

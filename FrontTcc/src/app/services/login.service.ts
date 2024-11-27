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
        sessionStorage.setItem("name", value.name);
        sessionStorage.setItem("idAtleta", value.idAtleta);
        sessionStorage.setItem("apelido", value.apelido);
      })
    );
  }

  autenticar():boolean{
    return !!sessionStorage.getItem("auth-token");
  }

  retornaIdUsuario(): string | null{
    return sessionStorage.getItem("idAtleta")
  }

  sair(): void {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("idAtleta");
  }
}

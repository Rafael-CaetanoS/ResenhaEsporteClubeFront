import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastrarAtletaService {
  url:String = `localhost:8080/atletas`
  constructor(private http: HttpClient) { }


  cadastrarAtleta(atletaData: any): Observable<any> {

    return this.http.post('http://localhost:8080/atletas', atletaData);
  }
}

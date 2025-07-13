import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  constructor(private http: HttpClient) {}

  login(nome: string, senha: string): Observable<HttpResponse<any>> {
    return this.http.post(
      'http://localhost:3001/login',
      {
        nome: nome,
        senha: senha,
      },
      { observe: 'response' }
    );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from '../environment-url.service';
import { RepositoryService } from './repository.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthForUser } from 'src/app/interfaces/auth/auth-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private envUrl: EnvironmentUrlService,
    private repo: RepositoryService
  ) {}

  public loginTeste = (route: string, contact: AuthForUser) => {
    console.log('entrou no loginTeste');
    return this.http.post<AuthForUser>(
      this.repo.createCompleteRoute(route, this.envUrl.urlAddress),
      contact,
      this.repo.generateHeaders()
    );
  };

  login(user: AuthForUser): Observable<any> {
    const loginUrl: string = `/collaborator/login/${user}`;
    return this.http.post<any>(loginUrl + '/login', user).pipe(
      tap((resposta) => {
        if (!resposta.sucesso) return;
        localStorage.setItem('token', btoa(JSON.stringify(resposta['token'])));
        localStorage.setItem('user', btoa(JSON.stringify(resposta['user'])));
        this.router.navigate(['']);
      })
    );
  }
  deslogar() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  get obterUsuarioLogado(): AuthForUser {
    return localStorage.getItem('user')
      ? JSON.parse(atob(localStorage.getItem('user')))
      : null;
  }
  get obterIdUsuarioLogado(): string {
    return localStorage.getItem('user')
      ? (JSON.parse(atob(localStorage.getItem('user'))) as AuthForUser).id
      : null;
  }
  get obterTokenUsuario(): string {
    return localStorage.getItem('token')
      ? JSON.parse(atob(localStorage.getItem('token')))
      : null;
  }
  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}

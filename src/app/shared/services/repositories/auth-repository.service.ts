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

  public login = (route: string, user: AuthForUser) => {
    return this.http.post<AuthForUser>(
      this.repo.createCompleteRoute(route, this.envUrl.urlAddress),
      user,
    ).pipe(tap((response) => {
      localStorage.setItem('token', JSON.stringify(response).split(' ')[1].slice(0, -1));
        this.router.navigate(['']);
    }));
  };

  public logout = (route: string) => {
    return this.http.post<any>(
      this.repo.createCompleteRoute(route, this.envUrl.urlAddress),
      {},
     ).pipe(tap(() => {
      localStorage.clear();
      this.router.navigate(['login']);
    }));
  };

  // get getLoggedUser(): AuthForUser {
  //   return localStorage.getItem('user')
  //     ? JSON.parse(localStorage.getItem('user'))
  //     : null;
  // }
  // get getLoggedUserId(): string {
  //   return localStorage.getItem('user')
  //     ? (JSON.parse(localStorage.getItem('user')) as AuthForUser).id
  //     : null;
  // }
  get getUserToken(): string {
    return localStorage.getItem('token')
      ? localStorage.getItem('token')
      : null;
  }
  get isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}

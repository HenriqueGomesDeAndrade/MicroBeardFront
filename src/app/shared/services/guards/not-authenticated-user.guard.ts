import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthRepositoryService } from '../repositories/auth-repository.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticatedUserGuard implements CanActivate {
  constructor(
    private userService: AuthRepositoryService,
    private router: Router) { }
  canActivate(){
    if (this.userService.isLogged) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const cuidador = localStorage.getItem('cuidador');
    if (cuidador) {
      return true;  // Permite navegar
    } else {
      return this.router.parseUrl('/login');  // Redirige a login
    }
  }
}

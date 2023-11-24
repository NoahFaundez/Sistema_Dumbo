import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    let isAuthenticated = false;
    
    if(localStorage.getItem('user')) {
      isAuthenticated = true;
    } else {
      isAuthenticated = false;
    }

    if (isAuthenticated) {
      return true;
    } else {
      // Si no está autenticado, navega al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
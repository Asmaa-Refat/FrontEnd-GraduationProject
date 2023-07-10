import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyGuardGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate():boolean {
    let ok = localStorage.getItem('isLoggedIn')
    if ( ok == 'true') {
      return true;
    } else {
      this.router.navigate(['/login-signup']);

      return false;
    }
}
}
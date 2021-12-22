import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (sessionStorage.getItem('userName')==null) {
      alert('You are not allowed to view this page');
      return false;
    } else {
      return true;
    }
  }

  constructor(private _router: Router) {

  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardStudentGuard implements CanActivate {
  constructor(private router: Router) {

    console.log('localStor ', localStorage['role'] );
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage['role'] == "student" && localStorage['token'] ) {

        return true;
      }
      else {
        this.router.navigateByUrl('/')
        return false;

}
  }
  
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router) {

    console.log('localStor ', localStorage['role'] );
  }

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage['role'] == "admin" && localStorage['token'] ) {

        this.router.navigateByUrl('/dashboard')

        return false;
      }
      else if (localStorage['role'] == "teacher" && localStorage['token']) {
        this.router.navigateByUrl('/teachers/dashboard')
        return false;
      }
      else if (localStorage['role'] == "student" && localStorage['token']) {
        this.router.navigateByUrl('/students/studentdash')
        return false;
      }
else{
  return true;
}
  }
  
}

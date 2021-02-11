import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthenticationService, private router: Router) { }


    canActivate() {
      if (!this.auth.isLoggedIn()) {
        this.router.navigateByUrl('/');
        return false;
      }
      return true;
    }


}

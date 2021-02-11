import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/auth.service';


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
private auth: AuthenticationService,
      private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (!this.auth.isAdmin()) {
        return false;
      }
      return true;
    }

}

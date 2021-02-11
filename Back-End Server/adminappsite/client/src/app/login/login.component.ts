import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../services/alert.service';
import {AuthenticationService, TokenPayload} from '../services/auth.service'

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent {
    credentials: TokenPayload = {
      username: '',
      password: ''
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthenticationService,
        private alertService: AlertService) { }


    login() {
      this.auth.login(this.credentials).subscribe(() => {
        this.router.navigateByUrl('/profile');
      }, (err) => {
        console.error(err);
      });
    }
}

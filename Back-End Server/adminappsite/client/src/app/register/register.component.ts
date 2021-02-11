import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CompanyService } from '../services/company.service';
import CoMpany from '../model/company.model';
import { AlertService } from '../services/alert.service';
import {AuthenticationService, TokenPayload} from '../services/auth.service'

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    username: '',
    companyid: '',
    password: ''
  };
  

  constructor(private auth: AuthenticationService, private router: Router, private companyService: CompanyService) {}
  companyList: CoMpany[];


  ngOnInit(): void {
    //At component initialization the
    this.companyService.getCompany()
      .subscribe(company => {

          console.log(this.companyList);
        //console.log(this.companyList);
        //assign the companylist property to the proper http response
        this.companyList = company;
        //console.log(company);
      });
  }
  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/login');
    }, (err) => {
      console.error(err);
    });
  }
}

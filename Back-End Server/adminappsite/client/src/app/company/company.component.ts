import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import CoMpany from '../model/company.model';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(
    //Private companyservice will be injected into the component by Angular Dependency Injector
    private companyService: CompanyService

  ) { }

  //Declaring the new company Object and initilizing it
  public newCompany: CoMpany = new CoMpany()

  //An Empty list for the visible company list
  companyList: CoMpany[];
  editCompanys: CoMpany[] = [];

  ngOnInit(): void {
    //At component initialization the
    this.companyService.getCompany()
      .subscribe(company => {
        //console.log(this.companyList);
        //assign the companylist property to the proper http response
        this.companyList = company;
        //console.log(company);
      });
  }
  create() {
    this.companyService.createCompany(this.newCompany)
      .subscribe((res) => {
        this.companyList.push(res.data);
        this.newCompany = new CoMpany();
      });


  }
}

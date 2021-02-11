import { Component, OnInit } from '@angular/core';
import { PurposeService } from '../services/purpose.service';
import PuRpose from '../model/purpose.model';


@Component({
  selector: 'app-purpose',
  templateUrl: './purpose.component.html',
  styleUrls: ['./purpose.component.css']
})
export class PurposeComponent implements OnInit {

  constructor(
    //Private purposeservice will be injected into the component by Angular Dependency Injector
    private purposeService: PurposeService

  ) { }

  //Declaring the new purpose Object and initilizing it
  public newPurpose: PuRpose = new PuRpose()

  //An Empty list for the visible purpose list
  purposeList: PuRpose[];
  editPurposes: PuRpose[] = [];

  ngOnInit(): void {
    //At component initialization the
    this.purposeService.getPurpose()
      .subscribe(purpose => {
        //  console.log(this.purposeList);
        //assign the purposelist property to the proper http response
        this.purposeList = purpose;
        //console.log(purpose);
      });
  }
  create() {
    this.purposeService.createPurpose(this.newPurpose)
      .subscribe((res) => {
        this.purposeList.push(res.data);
        this.newPurpose = new PuRpose();
      });


  }
}

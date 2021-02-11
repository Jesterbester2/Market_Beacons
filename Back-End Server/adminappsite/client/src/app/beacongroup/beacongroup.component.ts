import { Component, OnInit } from '@angular/core';
import { BeacongroupService } from '../services/beacongroup.service';
import BeAcongrp from '../model/beacongroup.model';


@Component({
  selector: 'app-beacongroup',
  templateUrl: './beacongroup.component.html',
  styleUrls: ['./beacongroup.component.css']
})
export class BeacongroupComponent implements OnInit {

  constructor(
    //Private beacongroupservice will be injected into the component by Angular Dependency Injector
    private beacongroupService: BeacongroupService

  ) { }

  //Declaring the new beacongroup Object and initilizing it
  public newBeacongroup: BeAcongrp = new BeAcongrp()

  //An Empty list for the visible beacongroup list
  beacongroupList: BeAcongrp[];
  editBeacongroups: BeAcongrp[] = [];

  ngOnInit(): void {
    //At component initialization the
    this.beacongroupService.getBeacongrp()
      .subscribe(beacongroup => {
        //console.log(this.beacongroupList);
        //assign the beacongrouplist property to the proper http response
        this.beacongroupList = beacongroup;
        //console.log(beacongroup);
      });
  }
  create() {
    this.beacongroupService.createBeacongrp(this.newBeacongroup)
      .subscribe((res) => {
        this.beacongroupList.push(res.data);
        this.newBeacongroup = new BeAcongrp();
      });


  }
}

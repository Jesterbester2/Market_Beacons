import { Component, OnInit } from '@angular/core';
import { BeaconService } from '../services/beacon.service';
import BeAcon from '../model/beacon.model';


@Component({
  selector: 'app-beacon',
  templateUrl: './beacon.component.html',
  styleUrls: ['./beacon.component.css']
})
export class BeaconComponent implements OnInit {

  constructor(
    //Private beaconservice will be injected into the component by Angular Dependency Injector
    private beaconService: BeaconService

  ) { }

  //Declaring the new beacon Object and initilizing it
  public newBeacon: BeAcon = new BeAcon()

  //An Empty list for the visible beacon list
  beaconList: BeAcon[];
  editBeacons: BeAcon[] = [];

  ngOnInit(): void {
    //At component initialization the
    this.beaconService.getBeacon()
      .subscribe(beacon => {
        //console.log(this.beaconList);
        //assign the beaconlist property to the proper http response
        this.beaconList = beacon;
        //console.log(beacon);
      });
  }

  create() {
    this.beaconService.createBeacon(this.newBeacon)
      .subscribe((res) => {
        this.beaconList.push(res.data);
        this.newBeacon = new BeAcon();
      });


  }
}

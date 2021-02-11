import { Component, OnInit } from '@angular/core';
import { NotigrpService } from '../services/notificationgroup.service';
import NoTigrp from '../model/notificationgroup.model';


@Component({
  selector: 'app-notificationgroup',
  templateUrl: './notificationgroup.component.html',
  styleUrls: ['./notificationgroup.component.css']
})
export class NotificationgroupComponent implements OnInit {

  constructor(
    //Private notificationgroupservice will be injected into the component by Angular Dependency Injector
    private notificationgroupService: NotigrpService

  ) { }

  //Declaring the new notificationgroup Object and initilizing it
  public newNotigrp: NoTigrp = new NoTigrp()

  //An Empty list for the visible notificationgroup list
  notificationgroupList: NoTigrp[];
  editNotigrps: NoTigrp[] = [];

  ngOnInit(): void {
    //At component initialization the
    this.notificationgroupService.getNotificationgroup()
      .subscribe(notificationgroup => {
        //console.log(this.notificationgroupList);
        //assign the notificationgrouplist property to the proper http response
        this.notificationgroupList = notificationgroup;
        //console.log(notificationgroup);
      });
  }

  create() {
    this.notificationgroupService.createNotificationgroup(this.newNotigrp)
      .subscribe((res) => {
        this.notificationgroupList.push(res.data);
        this.newNotigrp = new NoTigrp();
      });


  }
}

import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import NoTi from '../model/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(
    //Private notificationervice will be injected into the component by Angular Dependency Injector
    private notificationService: NotificationService

  ) { }

  //Declaring the new notification Object and initilizing it
  public newNoti: NoTi = new NoTi()

  //An Empty list for the visible notification list
  notificationList: NoTi[];

  ngOnInit(): void {
    //At component initialization the
    this.notificationService.getNoti()
      .subscribe(notification => {
        //console.log(this.notificationList);
        //assign the notificationlist property to the proper http response
        this.notificationList = notification;
        // console.log(notification);
      });
  }

  create() {
    this.notificationService.createNotification(this.newNoti)
      .subscribe((res) => {
        this.notificationList.push(res.data);
        this.newNoti = new NoTi();
      });


  }
}

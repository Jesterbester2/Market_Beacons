import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import UsEr from '../model/user.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    //Private userservice will be injected into the component by Angular Dependency Injector
    private userService: UserService


  ) { }

  //Declaring the new user Object and initilizing it
  public newUser: UsEr = new UsEr()

  //An Empty list for the visible user list
  usersList: UsEr[];
  editUsers: UsEr[] = [];

  ngOnInit(): void {
    //At component initialization the
    this.userService.getUser()
      .subscribe(user => {
        console.log(this.usersList);
        //assign the userlist property to the proper http response
        this.usersList = user;
        console.log(user);
      });
  }
  create() {
    this.userService.createUser(this.newUser)
      .subscribe((res) => {
        this.usersList.push(res.data)
        this.newUser = new UsEr()
      })


  }
  editUser(user: UsEr) {
    console.log(user)
    if (this.usersList.includes(user)) {
      if (!this.editUsers.includes(user)) {
        this.editUsers.push(user)
      } else {
        this.editUsers.splice(this.editUsers.indexOf(user), 1)
        this.userService.editUser(user).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editUser(user)
          console.error('Update Unsuccesful')
        })
      }
    }
  }
  doneUser(user: UsEr) {
    this.userService.editUser(user).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      this.editUser(user)
      console.error('Update Unsuccesful')
    })
  }
  submitUser(event, user: UsEr) {
    if (event.keyCode == 13) {
      this.editUser(user)
    }
  }
  deleteUser(user: UsEr) {
    this.userService.deleteUser(user._id).subscribe(res => {
      this.usersList.splice(this.usersList.indexOf(user), 1);
    })
  }
}

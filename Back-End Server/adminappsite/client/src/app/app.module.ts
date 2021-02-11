import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {UserService} from './services/user.service';
import {CompanyService} from './services/company.service';
import {TagService} from './services/tag.service';
import {NotificationService} from './services/notification.service';
import {NotigrpService} from './services/notificationgroup.service';
import {BeaconService} from './services/beacon.service';
import {BeacongroupService} from './services/beacongroup.service';
import {PurposeService} from './services/purpose.service';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CompanyComponent } from './company/company.component';
import { TagsComponent } from './tags/tags.component';
import { BeaconComponent } from './beacon/beacon.component';
import { BeacongroupComponent } from './beacongroup/beacongroup.component';
import { NotificationgroupComponent } from './notificationgroup/notificationgroup.component';
import { NotificationComponent } from './notification/notification.component';
import { PurposeComponent } from './purpose/purpose.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CompanyComponent,
    TagsComponent,
    BeaconComponent,
    BeacongroupComponent,
    NotificationgroupComponent,
    NotificationComponent,
    PurposeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule.forRoot(),
   AppRoutingModule
  ],
  providers: [
    UserService,
    CompanyService,
    TagService,
    BeaconService,
    BeacongroupService,
    NotificationService,
    NotigrpService,
    PurposeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

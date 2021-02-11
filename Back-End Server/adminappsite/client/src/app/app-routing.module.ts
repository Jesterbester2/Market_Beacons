import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { UserComponent } from './user/user.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CompanyComponent } from './company/company.component';
import { TagsComponent } from './tags/tags.component';
import { BeaconComponent } from './beacon/beacon.component';
import { BeacongroupComponent } from './beacongroup/beacongroup.component';
import { NotificationgroupComponent } from './notificationgroup/notificationgroup.component';
import { NotificationComponent } from './notification/notification.component';
import { PurposeComponent } from './purpose/purpose.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'purpose', component: PurposeComponent },
  { path: 'tag', component: TagsComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'notificationgroup', component: NotificationgroupComponent },
  { path: 'beacongroup', component: BeacongroupComponent },
  { path: 'beacon', component: BeaconComponent }
];



@NgModule({
  exports:[RouterModule],
  imports: [RouterModule.forRoot(routes)],
  declarations: []
})
export class AppRoutingModule { }

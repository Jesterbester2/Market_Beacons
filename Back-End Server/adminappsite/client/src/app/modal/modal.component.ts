import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';
import { TagService } from '../services/tag.service';
import NoTi from '../model/notification.model';
import NoTigrp from '../model/notificationgroup.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import BeAcon from '../model/beacon.model';
import { BeaconGraphComponent } from '../beacon-graph/beacon-graph.component';

interface dataobject{
  name: string;
  _id: string;

}



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
closeResult: string;

@Input() objects: dataobject[];
@Input() title: string;
//@Input() modaltype: number;

  constructor(
 public activeModal: NgbActiveModal,
    private tagService: TagService
  ) {
   }



objectarray: dataobject[];
ngOnInit(): void {
  this.objectarray = []
  //this.modaltype = true
this.objectarray = this.objects
//console.log(modaltype)
  //console.log(this.objectarray)
//console.log(this.objects)

}


  closeModal() {
    this.activeModal.close('Modal Closed');
  }


}

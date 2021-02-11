
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UploadService } from '../services/upload.service';
import UpLoad from '../model/upload.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
closeResult: string;

  @Input('mediapicked')  loggedfile: any;
  @Output() clickevent: EventEmitter<UpLoad>= new EventEmitter<UpLoad>();

  constructor(
private ngbModal: NgbModal,
    private uploadService: UploadService
  ) { }
image_url:string;
uploadList: UpLoad[];
fileToUpload: File = null;
public pickedfile: string;



  ngOnInit(): void {
    this.image_url  = `${environment.apiUrl}`;
    //console.log(this.loggedfile);
this.getUploads()


  }
  getUploads(){
  this.uploadService.getUserUploads()
    .subscribe(upload => {
      //  console.log(this.uploadList);
      //assign the uploadlist property to the proper http response
      this.uploadList = upload;

      //console.log(upload);
    });
  }
  fileAdd(files: FileList) {
      const file = files.item(0);
      //console.log(file);
      this.uploadService.postFile(file).subscribe((res) => {
        this.uploadList.push(res.data);
this.getUploads()
      });
  }
  onPickedImage(filePicked: any){
    console.log(filePicked._id)
        this.loggedfile=filePicked;
      this.pickedfile = filePicked._id;


      this.clickevent.emit(filePicked);

  }


    openUpload(content){
        const modalReg = this.ngbModal.open(content, {size: 'lg'});
       }

}

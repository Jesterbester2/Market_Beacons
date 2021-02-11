import { Component, OnInit } from '@angular/core';
import { TagService } from '../services/tag.service';
import TaGs from '../model/tag.model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  constructor(
    //Private tagservice will be injected into the component by Angular Dependency Injector
    private tagService: TagService

  ) { }

  //Declaring the new tag Object and initilizing it
  public newTag: TaGs = new TaGs()


  //An Empty list for the visible tag list
  tagsList: TaGs[];

  ngOnInit(): void {
    //At component initialization the
    this.tagService.getTags()
      .subscribe(tag => {
        //console.log(this.tagsList);
        //assign the taglist property to the proper http response
        this.tagsList = tag;
        //console.log(tag);
      });
  }
  create() {
    this.tagService.createTag(this.newTag)
      .subscribe((res) => {
        this.tagsList.push(res.data);
        this.newTag = new TaGs();
      });


  }
}

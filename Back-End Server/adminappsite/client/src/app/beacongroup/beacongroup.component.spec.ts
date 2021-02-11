import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeacongroupComponent } from './beacongroup.component';

describe('BeacongroupComponent', () => {
  let component: BeacongroupComponent;
  let fixture: ComponentFixture<BeacongroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeacongroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeacongroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

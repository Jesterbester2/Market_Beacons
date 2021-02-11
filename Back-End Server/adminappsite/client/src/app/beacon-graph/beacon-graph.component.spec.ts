import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconGraphComponent } from './beacon-graph.component';

describe('BeaconGraphComponent', () => {
  let component: BeaconGraphComponent;
  let fixture: ComponentFixture<BeaconGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

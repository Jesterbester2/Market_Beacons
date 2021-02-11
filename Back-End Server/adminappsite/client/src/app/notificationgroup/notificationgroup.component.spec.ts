import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationgroupComponent } from './notificationgroup.component';

describe('NotificationgroupComponent', () => {
  let component: NotificationgroupComponent;
  let fixture: ComponentFixture<NotificationgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

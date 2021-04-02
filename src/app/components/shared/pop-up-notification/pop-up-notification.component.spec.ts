import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpNotificationComponent } from './pop-up-notification.component';

describe('PopUpNotificationComponent', () => {
  let component: PopUpNotificationComponent;
  let fixture: ComponentFixture<PopUpNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

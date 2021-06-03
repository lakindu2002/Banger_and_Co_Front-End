import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVehicleBrowsingComponent } from './admin-vehicle-browsing.component';

describe('AdminVehicleBrowsingComponent', () => {
  let component: AdminVehicleBrowsingComponent;
  let fixture: ComponentFixture<AdminVehicleBrowsingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVehicleBrowsingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVehicleBrowsingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

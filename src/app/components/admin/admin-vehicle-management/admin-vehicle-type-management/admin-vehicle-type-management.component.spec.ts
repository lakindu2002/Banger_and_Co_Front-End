import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVehicleTypeManagementComponent } from './admin-vehicle-type-management.component';

describe('AdminVehicleTypeManagementComponent', () => {
  let component: AdminVehicleTypeManagementComponent;
  let fixture: ComponentFixture<AdminVehicleTypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVehicleTypeManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVehicleTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

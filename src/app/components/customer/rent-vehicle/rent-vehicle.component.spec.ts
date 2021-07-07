import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentVehicleComponent } from './rent-vehicle.component';

describe('RentVehicleComponent', () => {
  let component: RentVehicleComponent;
  let fixture: ComponentFixture<RentVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

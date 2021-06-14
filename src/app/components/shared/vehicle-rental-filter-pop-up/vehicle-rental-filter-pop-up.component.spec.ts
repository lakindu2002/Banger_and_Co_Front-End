import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRentalFilterPopUpComponent } from './vehicle-rental-filter-pop-up.component';

describe('VehicleRentalFilterPopUpComponent', () => {
  let component: VehicleRentalFilterPopUpComponent;
  let fixture: ComponentFixture<VehicleRentalFilterPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleRentalFilterPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRentalFilterPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVehicleOnRentalComponent } from './show-vehicle-on-rental.component';

describe('ShowVehicleOnRentalComponent', () => {
  let component: ShowVehicleOnRentalComponent;
  let fixture: ComponentFixture<ShowVehicleOnRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowVehicleOnRentalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVehicleOnRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

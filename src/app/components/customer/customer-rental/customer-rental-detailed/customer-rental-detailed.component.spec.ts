import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRentalDetailedComponent } from './customer-rental-detailed.component';

describe('CustomerRentalDetailedComponent', () => {
  let component: CustomerRentalDetailedComponent;
  let fixture: ComponentFixture<CustomerRentalDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRentalDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRentalDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

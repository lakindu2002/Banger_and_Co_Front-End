import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRentalCardComponent } from './customer-rental-card.component';

describe('CustomerRentalCardComponent', () => {
  let component: CustomerRentalCardComponent;
  let fixture: ComponentFixture<CustomerRentalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRentalCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRentalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRejectedComponent } from './customer-rejected.component';

describe('CustomerRejectedComponent', () => {
  let component: CustomerRejectedComponent;
  let fixture: ComponentFixture<CustomerRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

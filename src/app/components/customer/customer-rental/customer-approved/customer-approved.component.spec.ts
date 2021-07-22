import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerApprovedComponent } from './customer-approved.component';

describe('CustomerApprovedComponent', () => {
  let component: CustomerApprovedComponent;
  let fixture: ComponentFixture<CustomerApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

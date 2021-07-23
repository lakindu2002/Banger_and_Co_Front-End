import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPastComponent } from './customer-past.component';

describe('CustomerPastComponent', () => {
  let component: CustomerPastComponent;
  let fixture: ComponentFixture<CustomerPastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

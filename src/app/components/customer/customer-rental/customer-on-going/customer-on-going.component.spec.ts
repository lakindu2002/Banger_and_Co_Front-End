import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOnGoingComponent } from './customer-on-going.component';

describe('CustomerOnGoingComponent', () => {
  let component: CustomerOnGoingComponent;
  let fixture: ComponentFixture<CustomerOnGoingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOnGoingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOnGoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

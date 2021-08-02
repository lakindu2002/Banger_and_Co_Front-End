import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPendingRentalsComponent } from './total-pending-rentals.component';

describe('TotalPendingRentalsComponent', () => {
  let component: TotalPendingRentalsComponent;
  let fixture: ComponentFixture<TotalPendingRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPendingRentalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPendingRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

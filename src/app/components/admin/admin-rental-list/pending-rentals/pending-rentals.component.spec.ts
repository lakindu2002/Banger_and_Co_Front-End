import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRentalsComponent } from './pending-rentals.component';

describe('PendingRentalsComponent', () => {
  let component: PendingRentalsComponent;
  let fixture: ComponentFixture<PendingRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingRentalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

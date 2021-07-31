import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedRentalsComponent } from './rejected-rentals.component';

describe('RejectedRentalsComponent', () => {
  let component: RejectedRentalsComponent;
  let fixture: ComponentFixture<RejectedRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedRentalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

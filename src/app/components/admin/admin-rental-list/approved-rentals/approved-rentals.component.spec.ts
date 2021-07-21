import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRentalsComponent } from './approved-rentals.component';

describe('ApprovedRentalsComponent', () => {
  let component: ApprovedRentalsComponent;
  let fixture: ComponentFixture<ApprovedRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedRentalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

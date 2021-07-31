import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnGoingRentalsComponent } from './on-going-rentals.component';

describe('OnGoingRentalsComponent', () => {
  let component: OnGoingRentalsComponent;
  let fixture: ComponentFixture<OnGoingRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnGoingRentalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnGoingRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

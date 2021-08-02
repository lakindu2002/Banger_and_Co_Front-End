import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsToBeCollectedForTHisMonthComponent } from './rentals-to-be-collected-for-this-month.component';

describe('RentalsToBeCollectedForTHisMonthComponent', () => {
  let component: RentalsToBeCollectedForTHisMonthComponent;
  let fixture: ComponentFixture<RentalsToBeCollectedForTHisMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalsToBeCollectedForTHisMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalsToBeCollectedForTHisMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

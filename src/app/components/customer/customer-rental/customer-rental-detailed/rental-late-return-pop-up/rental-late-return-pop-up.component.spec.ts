import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalLateReturnPopUpComponent } from './rental-late-return-pop-up.component';

describe('RentalLateReturnPopUpComponent', () => {
  let component: RentalLateReturnPopUpComponent;
  let fixture: ComponentFixture<RentalLateReturnPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalLateReturnPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalLateReturnPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

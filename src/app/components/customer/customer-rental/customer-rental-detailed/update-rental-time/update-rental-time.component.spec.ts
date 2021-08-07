import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRentalTimeComponent } from './update-rental-time.component';

describe('UpdateRentalTimeComponent', () => {
  let component: UpdateRentalTimeComponent;
  let fixture: ComponentFixture<UpdateRentalTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRentalTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRentalTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

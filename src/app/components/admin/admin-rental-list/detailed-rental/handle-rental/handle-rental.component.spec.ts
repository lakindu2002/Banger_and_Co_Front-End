import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleRentalComponent } from './handle-rental.component';

describe('HandleRentalComponent', () => {
  let component: HandleRentalComponent;
  let fixture: ComponentFixture<HandleRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleRentalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandleRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

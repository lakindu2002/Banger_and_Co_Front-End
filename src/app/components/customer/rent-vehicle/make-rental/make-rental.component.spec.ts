import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeRentalComponent } from './make-rental.component';

describe('MakeRentalComponent', () => {
  let component: MakeRentalComponent;
  let fixture: ComponentFixture<MakeRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeRentalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

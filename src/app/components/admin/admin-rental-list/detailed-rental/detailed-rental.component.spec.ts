import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedRentalComponent } from './detailed-rental.component';

describe('DetailedRentalComponent', () => {
  let component: DetailedRentalComponent;
  let fixture: ComponentFixture<DetailedRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedRentalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

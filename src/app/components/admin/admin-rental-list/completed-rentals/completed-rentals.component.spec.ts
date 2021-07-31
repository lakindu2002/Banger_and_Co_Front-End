import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedRentalsComponent } from './completed-rentals.component';

describe('CompletedRentalsComponent', () => {
  let component: CompletedRentalsComponent;
  let fixture: ComponentFixture<CompletedRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedRentalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

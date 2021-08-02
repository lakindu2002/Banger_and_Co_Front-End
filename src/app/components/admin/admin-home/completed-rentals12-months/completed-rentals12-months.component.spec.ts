import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedRentals12MonthsComponent } from './completed-rentals12-months.component';

describe('CompletedRentals12MonthsComponent', () => {
  let component: CompletedRentals12MonthsComponent;
  let fixture: ComponentFixture<CompletedRentals12MonthsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedRentals12MonthsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedRentals12MonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

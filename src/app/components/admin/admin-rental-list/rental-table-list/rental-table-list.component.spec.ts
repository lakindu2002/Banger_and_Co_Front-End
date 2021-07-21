import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalTableListComponent } from './rental-table-list.component';

describe('RentalTableListComponent', () => {
  let component: RentalTableListComponent;
  let fixture: ComponentFixture<RentalTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalTableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

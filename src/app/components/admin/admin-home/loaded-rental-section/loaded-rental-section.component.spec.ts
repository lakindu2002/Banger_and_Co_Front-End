import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadedRentalSectionComponent } from './loaded-rental-section.component';

describe('LoadedRentalSectionComponent', () => {
  let component: LoadedRentalSectionComponent;
  let fixture: ComponentFixture<LoadedRentalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadedRentalSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadedRentalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

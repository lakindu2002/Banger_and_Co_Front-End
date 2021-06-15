import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterVehicleListComponent } from './filter-vehicle-list.component';

describe('FilterVehicleListComponent', () => {
  let component: FilterVehicleListComponent;
  let fixture: ComponentFixture<FilterVehicleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterVehicleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

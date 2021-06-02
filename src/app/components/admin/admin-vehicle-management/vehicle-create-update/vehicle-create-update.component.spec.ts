import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCreateUpdateComponent } from './vehicle-create-update.component';

describe('VehicleCreateUpdateComponent', () => {
  let component: VehicleCreateUpdateComponent;
  let fixture: ComponentFixture<VehicleCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

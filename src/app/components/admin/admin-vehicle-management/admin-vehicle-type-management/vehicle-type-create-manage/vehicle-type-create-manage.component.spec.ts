import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeCreateManageComponent } from './vehicle-type-create-manage.component';

describe('VehicleTypeCreateManageComponent', () => {
  let component: VehicleTypeCreateManageComponent;
  let fixture: ComponentFixture<VehicleTypeCreateManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleTypeCreateManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeCreateManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

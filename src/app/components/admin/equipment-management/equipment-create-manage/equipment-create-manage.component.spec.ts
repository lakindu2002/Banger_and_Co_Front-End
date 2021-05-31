import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentCreateManageComponent } from './equipment-create-manage.component';

describe('EquipmentCreateManageComponent', () => {
  let component: EquipmentCreateManageComponent;
  let fixture: ComponentFixture<EquipmentCreateManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentCreateManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentCreateManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

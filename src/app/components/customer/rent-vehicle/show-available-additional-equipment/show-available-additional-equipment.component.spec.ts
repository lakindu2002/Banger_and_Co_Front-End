import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAvailableAdditionalEquipmentComponent } from './show-available-additional-equipment.component';

describe('ShowAvailableAdditionalEquipmentComponent', () => {
  let component: ShowAvailableAdditionalEquipmentComponent;
  let fixture: ComponentFixture<ShowAvailableAdditionalEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAvailableAdditionalEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAvailableAdditionalEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

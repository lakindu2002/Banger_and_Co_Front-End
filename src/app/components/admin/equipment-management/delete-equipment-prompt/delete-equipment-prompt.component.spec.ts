import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEquipmentPromptComponent } from './delete-equipment-prompt.component';

describe('DeleteEquipmentPromptComponent', () => {
  let component: DeleteEquipmentPromptComponent;
  let fixture: ComponentFixture<DeleteEquipmentPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteEquipmentPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEquipmentPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

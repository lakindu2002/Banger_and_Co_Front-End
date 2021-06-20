import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveVehiclePromptComponent } from './remove-vehicle-prompt.component';

describe('RemoveVehiclePromptComponent', () => {
  let component: RemoveVehiclePromptComponent;
  let fixture: ComponentFixture<RemoveVehiclePromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveVehiclePromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveVehiclePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

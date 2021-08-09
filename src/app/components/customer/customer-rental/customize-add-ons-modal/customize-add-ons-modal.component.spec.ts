import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeAddOnsModalComponent } from './customize-add-ons-modal.component';

describe('CustomizeAddOnsModalComponent', () => {
  let component: CustomizeAddOnsModalComponent;
  let fixture: ComponentFixture<CustomizeAddOnsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizeAddOnsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeAddOnsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDeletePromptComponent } from './type-delete-prompt.component';

describe('TypeDeletePromptComponent', () => {
  let component: TypeDeletePromptComponent;
  let fixture: ComponentFixture<TypeDeletePromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeDeletePromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDeletePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

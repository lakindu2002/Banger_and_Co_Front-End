import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsStateComponent } from './contact-us-state.component';

describe('ContactUsStateComponent', () => {
  let component: ContactUsStateComponent;
  let fixture: ComponentFixture<ContactUsStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdentificationComponent } from './user-identification.component';

describe('UserIdentificationComponent', () => {
  let component: UserIdentificationComponent;
  let fixture: ComponentFixture<UserIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserIdentificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRentalListComponent } from './admin-rental-list.component';

describe('AdminRentalListComponent', () => {
  let component: AdminRentalListComponent;
  let fixture: ComponentFixture<AdminRentalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRentalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRentalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

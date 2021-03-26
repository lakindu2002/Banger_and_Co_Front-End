import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNavComponent } from './customer-nav.component';

describe('CustomerNavComponent', () => {
  let component: CustomerNavComponent;
  let fixture: ComponentFixture<CustomerNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

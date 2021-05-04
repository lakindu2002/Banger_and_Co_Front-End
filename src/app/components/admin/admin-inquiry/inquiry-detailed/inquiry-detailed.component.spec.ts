import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryDetailedComponent } from './inquiry-detailed.component';

describe('InquiryDetailedComponent', () => {
  let component: InquiryDetailedComponent;
  let fixture: ComponentFixture<InquiryDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

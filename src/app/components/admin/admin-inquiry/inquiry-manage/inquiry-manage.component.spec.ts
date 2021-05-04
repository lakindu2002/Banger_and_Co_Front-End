import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryManageComponent } from './inquiry-manage.component';

describe('InquiryManageComponent', () => {
  let component: InquiryManageComponent;
  let fixture: ComponentFixture<InquiryManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

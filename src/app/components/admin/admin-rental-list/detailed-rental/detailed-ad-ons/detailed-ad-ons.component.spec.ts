import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedAdOnsComponent } from './detailed-ad-ons.component';

describe('DetailedAdOnsComponent', () => {
  let component: DetailedAdOnsComponent;
  let fixture: ComponentFixture<DetailedAdOnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedAdOnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedAdOnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

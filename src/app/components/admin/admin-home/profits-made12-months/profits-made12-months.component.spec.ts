import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitsMade12MonthsComponent } from './profits-made12-months.component';

describe('ProfitsMade12MonthsComponent', () => {
  let component: ProfitsMade12MonthsComponent;
  let fixture: ComponentFixture<ProfitsMade12MonthsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitsMade12MonthsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitsMade12MonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

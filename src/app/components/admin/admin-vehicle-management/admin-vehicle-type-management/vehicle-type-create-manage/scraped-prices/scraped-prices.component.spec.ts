import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapedPricesComponent } from './scraped-prices.component';

describe('ScrapedPricesComponent', () => {
  let component: ScrapedPricesComponent;
  let fixture: ComponentFixture<ScrapedPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrapedPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapedPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

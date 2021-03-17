import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JumbotronHomeComponent } from './jumbotron-home.component';

describe('JumbotronHomeComponent', () => {
  let component: JumbotronHomeComponent;
  let fixture: ComponentFixture<JumbotronHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JumbotronHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JumbotronHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

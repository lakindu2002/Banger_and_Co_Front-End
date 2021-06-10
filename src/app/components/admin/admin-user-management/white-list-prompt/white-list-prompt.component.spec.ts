import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteListPromptComponent } from './white-list-prompt.component';

describe('WhiteListPromptComponent', () => {
  let component: WhiteListPromptComponent;
  let fixture: ComponentFixture<WhiteListPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhiteListPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteListPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

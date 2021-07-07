import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserImagesComponent } from './show-user-images.component';

describe('ShowUserImagesComponent', () => {
  let component: ShowUserImagesComponent;
  let fixture: ComponentFixture<ShowUserImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUserImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUserImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeDewormingPage } from './home-deworming.page';

describe('HomeDewormingPage', () => {
  let component: HomeDewormingPage;
  let fixture: ComponentFixture<HomeDewormingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDewormingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

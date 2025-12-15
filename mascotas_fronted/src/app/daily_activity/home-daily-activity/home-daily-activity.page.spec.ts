import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeDailyActivityPage } from './home-daily-activity.page';

describe('HomeDailyActivityPage', () => {
  let component: HomeDailyActivityPage;
  let fixture: ComponentFixture<HomeDailyActivityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDailyActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

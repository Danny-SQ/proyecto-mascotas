import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeReminderPage } from './home-reminder.page';

describe('HomeReminderPage', () => {
  let component: HomeReminderPage;
  let fixture: ComponentFixture<HomeReminderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeReminderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

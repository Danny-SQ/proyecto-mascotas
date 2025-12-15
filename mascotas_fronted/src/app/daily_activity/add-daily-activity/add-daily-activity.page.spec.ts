import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDailyActivityPage } from './add-daily-activity.page';

describe('AddDailyActivityPage', () => {
  let component: AddDailyActivityPage;
  let fixture: ComponentFixture<AddDailyActivityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDailyActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

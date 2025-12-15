import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDailyActivityPage } from './edit-daily-activity.page';

describe('EditDailyActivityPage', () => {
  let component: EditDailyActivityPage;
  let fixture: ComponentFixture<EditDailyActivityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDailyActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

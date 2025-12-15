import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteDailyActivityPage } from './delete-daily-activity.page';

describe('DeleteDailyActivityPage', () => {
  let component: DeleteDailyActivityPage;
  let fixture: ComponentFixture<DeleteDailyActivityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDailyActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

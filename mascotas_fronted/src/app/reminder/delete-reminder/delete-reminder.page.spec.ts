import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteReminderPage } from './delete-reminder.page';

describe('DeleteReminderPage', () => {
  let component: DeleteReminderPage;
  let fixture: ComponentFixture<DeleteReminderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReminderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

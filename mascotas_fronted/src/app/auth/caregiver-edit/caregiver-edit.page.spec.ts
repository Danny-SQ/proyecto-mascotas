import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaregiverEditPage } from './caregiver-edit.page';

describe('CaregiverEditPage', () => {
  let component: CaregiverEditPage;
  let fixture: ComponentFixture<CaregiverEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

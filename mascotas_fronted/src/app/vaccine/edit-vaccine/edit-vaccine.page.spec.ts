import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditVaccinePage } from './edit-vaccine.page';

describe('EditVaccinePage', () => {
  let component: EditVaccinePage;
  let fixture: ComponentFixture<EditVaccinePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVaccinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

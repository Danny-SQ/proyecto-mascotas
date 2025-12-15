import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddVaccinePage } from './add-vaccine.page';

describe('AddVaccinePage', () => {
  let component: AddVaccinePage;
  let fixture: ComponentFixture<AddVaccinePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVaccinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

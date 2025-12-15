import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteVaccinePage } from './delete-vaccine.page';

describe('DeleteVaccinePage', () => {
  let component: DeleteVaccinePage;
  let fixture: ComponentFixture<DeleteVaccinePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteVaccinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

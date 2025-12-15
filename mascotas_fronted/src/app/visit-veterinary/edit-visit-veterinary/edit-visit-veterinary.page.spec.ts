import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditVisitVeterinaryPage } from './edit-visit-veterinary.page';

describe('EditVisitVeterinaryPage', () => {
  let component: EditVisitVeterinaryPage;
  let fixture: ComponentFixture<EditVisitVeterinaryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVisitVeterinaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

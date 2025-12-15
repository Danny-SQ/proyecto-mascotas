import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddVisitVeterinaryPage } from './add-visit-veterinary.page';

describe('AddVisitVeterinaryPage', () => {
  let component: AddVisitVeterinaryPage;
  let fixture: ComponentFixture<AddVisitVeterinaryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVisitVeterinaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDewormingPage } from './edit-deworming.page';

describe('EditDewormingPage', () => {
  let component: EditDewormingPage;
  let fixture: ComponentFixture<EditDewormingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDewormingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

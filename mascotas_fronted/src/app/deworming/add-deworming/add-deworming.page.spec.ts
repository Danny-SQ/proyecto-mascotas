import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDewormingPage } from './add-deworming.page';

describe('AddDewormingPage', () => {
  let component: AddDewormingPage;
  let fixture: ComponentFixture<AddDewormingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDewormingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

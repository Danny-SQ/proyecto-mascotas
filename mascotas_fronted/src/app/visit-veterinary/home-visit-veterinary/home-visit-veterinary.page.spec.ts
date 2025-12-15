import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeVisitVeterinaryPage } from './home-visit-veterinary.page';

describe('HomeVisitVeterinaryPage', () => {
  let component: HomeVisitVeterinaryPage;
  let fixture: ComponentFixture<HomeVisitVeterinaryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeVisitVeterinaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

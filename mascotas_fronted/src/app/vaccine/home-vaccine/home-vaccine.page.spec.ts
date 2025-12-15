import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeVaccinePage } from './home-vaccine.page';

describe('HomeVaccinePage', () => {
  let component: HomeVaccinePage;
  let fixture: ComponentFixture<HomeVaccinePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeVaccinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

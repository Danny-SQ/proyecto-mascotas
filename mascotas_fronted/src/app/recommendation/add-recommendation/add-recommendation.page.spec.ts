import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddRecommendationPage } from './add-recommendation.page';

describe('AddRecommendationPage', () => {
  let component: AddRecommendationPage;
  let fixture: ComponentFixture<AddRecommendationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecommendationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

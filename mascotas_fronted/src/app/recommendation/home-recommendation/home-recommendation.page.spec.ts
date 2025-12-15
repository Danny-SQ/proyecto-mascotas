import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeRecommendationPage } from './home-recommendation.page';

describe('HomeRecommendationPage', () => {
  let component: HomeRecommendationPage;
  let fixture: ComponentFixture<HomeRecommendationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRecommendationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRecommendationPage } from './edit-recommendation.page';

describe('EditRecommendationPage', () => {
  let component: EditRecommendationPage;
  let fixture: ComponentFixture<EditRecommendationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecommendationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

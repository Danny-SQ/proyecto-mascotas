import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteRecommendationPage } from './delete-recommendation.page';

describe('DeleteRecommendationPage', () => {
  let component: DeleteRecommendationPage;
  let fixture: ComponentFixture<DeleteRecommendationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRecommendationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

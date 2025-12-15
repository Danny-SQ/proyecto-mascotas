import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePetPage } from './home-pet.page';

describe('HomePetPage', () => {
  let component: HomePetPage;
  let fixture: ComponentFixture<HomePetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

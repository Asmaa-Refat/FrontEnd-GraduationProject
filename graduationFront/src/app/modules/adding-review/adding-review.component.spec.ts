import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingReviewComponent } from './adding-review.component';

describe('AddingReviewComponent', () => {
  let component: AddingReviewComponent;
  let fixture: ComponentFixture<AddingReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

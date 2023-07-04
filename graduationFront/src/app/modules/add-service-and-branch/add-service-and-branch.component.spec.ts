import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceAndBranchComponent } from './add-service-and-branch.component';

describe('AddServiceAndBranchComponent', () => {
  let component: AddServiceAndBranchComponent;
  let fixture: ComponentFixture<AddServiceAndBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiceAndBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServiceAndBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

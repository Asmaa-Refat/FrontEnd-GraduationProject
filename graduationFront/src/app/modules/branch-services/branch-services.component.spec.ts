import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchServicesComponent } from './branch-services.component';

describe('BranchServicesComponent', () => {
  let component: BranchServicesComponent;
  let fixture: ComponentFixture<BranchServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

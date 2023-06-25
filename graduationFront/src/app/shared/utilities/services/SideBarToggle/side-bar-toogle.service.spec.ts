import { TestBed } from '@angular/core/testing';

import { SideBarToogleService } from './side-bar-toogle.service';

describe('SideBarToogleService', () => {
  let service: SideBarToogleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideBarToogleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

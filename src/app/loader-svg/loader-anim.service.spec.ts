import { TestBed, inject } from '@angular/core/testing';

import { LoaderAnimService } from './loader-anim.service';

describe('LoaderAnimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderAnimService]
    });
  });

  it('should be created', inject([LoaderAnimService], (service: LoaderAnimService) => {
    expect(service).toBeTruthy();
  }));
});

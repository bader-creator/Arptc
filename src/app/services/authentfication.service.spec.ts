import { TestBed } from '@angular/core/testing';

import { AuthentficationService } from './authentfication.service';

describe('AuthentficationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthentficationService = TestBed.get(AuthentficationService);
    expect(service).toBeTruthy();
  });
});

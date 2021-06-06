import { TestBed } from '@angular/core/testing';

import { ChooseServerService } from './choose-server.service';

describe('ChooseServerService', () => {
  let service: ChooseServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChooseServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

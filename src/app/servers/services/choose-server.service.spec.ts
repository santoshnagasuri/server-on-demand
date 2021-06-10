import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ChooseServerService } from './choose-server.service';
import { ServerData } from '../models/ServerData';
import { Server } from '../models/Server';
import { ServerRam } from '../models/ServerRam';
import { ServerHdd } from '../models/ServerHdd';
import { ServerPrice } from '../models/ServerPrice';

describe('ChooseServerService', () => {
  let injector: TestBed;
  let service: ChooseServerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChooseServerService]
    });

    injector = getTestBed();
    service = TestBed.inject(ChooseServerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getAllServers', () => {
    it('should return an Observable<ServerData[]>', () => {
      let testServerData = new ServerData();
      const testServer1 = new Server();
      const testRam = new ServerRam();
      testRam.memory = 'Test';
      testRam.unit = 'Test';
      testRam.type = 'Test';
      const testHdd = new ServerHdd();
      testHdd.count = 'Test';
      testHdd.memory = 'Test';
      testHdd.type = 'Test';
      testHdd.unit = 'Test';
      const price = new ServerPrice();
      price.amountCents = 123;
      price.currency = 'Test';
      price.currencySymbol = 'Test';
      testServer1.ram = testRam;
      testServer1.hdd = testHdd;
      testServer1.price = price;
      testServer1.location = 'Test';
      testServer1.model = 'Test';
      testServerData.servers = [];
      testServerData.servers.push(testServer1);

      service.getAllServers().subscribe(serverData => {
        expect(serverData.servers.length).toBe(1);
        expect(serverData).toEqual(testServerData);
      });

      const req = httpMock.expectOne("http://95.211.111.66:4300/api/servers");
      expect(req.request.method).toBe("GET");
      req.flush(testServerData);
    });
  });
});
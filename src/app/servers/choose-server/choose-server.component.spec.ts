import { ChooseServerComponent } from './choose-server.component';
import { ChooseServerService } from "../services/choose-server.service";
import { HttpClient } from '@angular/common/http';
import { ServerData } from '../models/ServerData';
import { ServerRam } from '../models/ServerRam';
import { ServerHdd } from '../models/ServerHdd';
import { ServerPrice } from '../models/ServerPrice';
import { Server } from '../models/Server';
import { Observable, of } from 'rxjs';

describe('Component: ChooseServer', () => {

  let component: ChooseServerComponent;
  let service: ChooseServerService;
  let spy: any;
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

  beforeEach(() => {
    service = new ChooseServerService(HttpClient.prototype);
    component = new ChooseServerComponent(service);
  });


  it('makes sure count is set correctly after fetching data from server', () => {
    spy = spyOn(service, 'getAllServers').and.returnValue(of(testServerData));
    component.getAllServersOnLoad();
    expect(service.getAllServers).toHaveBeenCalled();
    expect(component.totalNumberOfServers).toBe(1);
  });

  it('makes sure the tooltip shown on slider is correct', () => {
    expect(component.formatter(2500)).toBe('2.5TB');
  });

  it('makes sure table title is set correctly after getting response from server', () => {
    spy = spyOn(service, 'getAllServers').and.returnValue(of(testServerData));
    component.getAllServersOnLoad();
    expect(component.getTableTitle()).toBe('1 servers available');
  });

  it('makes sure that the component will correctly send query params to the Service', () => {
    spy = spyOn(service, 'searchServers').and.callThrough();
    component.serverStorageRange = [2500, 4000];
    component.hddTypesSelected = [];
    component.hddTypesSelected.push("SATA");
    component.hddTypesSelected.push("SSD");
    component.selectedServerLocation = "TestLocation";
    component.ramOptionsOne.forEach(function (option, index) {
      if (index !== 0 && index !== 1) {
        option.checked = false;
      }
    });
    component.searchServers();
    expect(service.searchServers).toHaveBeenCalledWith(2500, 4000, '2,4', 'SATA,SSD', 'TestLocation');
  });
});
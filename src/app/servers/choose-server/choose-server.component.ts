import { Component, OnInit } from '@angular/core';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Server } from '../models/Server';
import { ChooseServerService } from '../services/choose-server.service';

@Component({
  selector: 'app-choose-server',
  templateUrl: './choose-server.component.html',
  styleUrls: ['./choose-server.component.css']
})
export class ChooseServerComponent implements OnInit {
  listOfCurrentPageData!: readonly Server[];

  constructor(private chooseServerService: ChooseServerService) { }

  listOfServers: Server[] = [];
  checked = false;
  indeterminate = false;
  listOfSelectedServers: Server[] = [];
  setOfCheckedServers = new Set<Server>();
  loading = false;
  serverStorageRange = [0, 72000];
  totalNumberOfServers: number = 0;
  ramOptionsOne = [
    { label: '2GB ', value: '2', checked: true },
    { label: '4GB ', value: '4', checked: true },
    { label: '8GB ', value: '8', checked: true },
    { label: '12GB', value: '12', checked: true },
    { label: '16GB', value: '16', checked: true },
    { label: '24GB', value: '24', checked: true },
    { label: '32GB', value: '32', checked: true },
    { label: '48GB', value: '48', checked: true },
    { label: '64GB', value: '64', checked: true },
    { label: '96GB', value: '96', checked: true },
  ];
  hddTypes = [
    { label: 'SAS', value: 'SAS' },
    { label: 'SATA', value: 'SATA' },
    { label: 'SSD', value: 'SSD' },
  ];
  hddTypesSelected: string[] = [];
  size: NzSelectSizeType = 'large';
  selectedServerLocation!: string;
  storageMarks = {
    0: '0TB',
    1000: '1TB',
    10000: '10TB',
    20000: '20TB',
    30000: '30TB',
    40000: '40TB',
    50000: '50TB',
    60000: '60TB',
    72000: '72TB',
  };



  ngOnInit(): void {
    this.loading = true;
    this.getAllServersOnLoad();
  }

  getAllServersOnLoad() {
    this.chooseServerService.getAllServers().subscribe(
      data => {
        this.listOfServers = data.servers;
        this.totalNumberOfServers = this.listOfServers.length;
        this.loading = false;
      }
    );
  }

  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<Server>): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

  onServerChecked(server: Server, checked: Boolean) {
    this.setOfCheckedServers.add(server);
  }

  onAllServersChecked(checked: Boolean) {
    if (checked) {
      this.listOfCurrentPageData.forEach(s =>
        this.setOfCheckedServers.add(s)
      );
    } else {
      this.setOfCheckedServers.clear();
    }
  }

  searchServers() {
    this.loading = true;
    let ram = this.ramOptionsOne.filter(r => r.checked).map(u => u.value).join(",");
    let storageMin = this.serverStorageRange[0];
    let storageMax = this.serverStorageRange[1];
    let hdd = this.hddTypesSelected.join(",");
    this.chooseServerService.searchServers(storageMin, storageMax, ram, hdd, this.selectedServerLocation).subscribe(
      data => {
        this.listOfServers = data.servers;
        this.totalNumberOfServers = this.listOfServers.length;
        this.loading = false;
      }
    )
  }

  formatter(value: number): string {
    let tbNum = value / 1000;
    return `${tbNum}TB`;
  }

  getTableTitle() {
    return `${this.totalNumberOfServers} servers available`
  }
}

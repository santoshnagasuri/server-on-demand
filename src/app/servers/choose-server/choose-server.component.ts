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
  serverStorageRange = [250, 44000];
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
  hddTypesSelected = [];
  size: NzSelectSizeType = 'large';
  selectedServerLocation!: string;



  ngOnInit(): void {
    this.loading = true;
    this.chooseServerService.getAllServers().subscribe(
      data => {
        console.log(data);
        this.listOfServers = data.servers;
        let u = new Set<String>();
        this.listOfServers.forEach(
          s => { u.add(s.location) }
        );
        console.log(u)
        this.loading = false;
      }
    )
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
    console.log(ram);
    let storageMin = this.serverStorageRange[0];
    let storageMax = this.serverStorageRange[1];
    let hdd = this.hddTypesSelected.join(",");
    this.chooseServerService.searchServers(storageMin, storageMax, ram, hdd, this.selectedServerLocation).subscribe(
      data => {
        this.listOfServers = data.servers;
        this.loading = false;
      }
    )
  }

  formatter(value: number): string {
    return `${value}MB`;
  }
}

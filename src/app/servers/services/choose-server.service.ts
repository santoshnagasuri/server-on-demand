import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Server } from '../models/Server';
import { environment } from '../../../environments/environment'
import { ServerData } from '../models/ServerData';

@Injectable({
  providedIn: 'root'
})
export class ChooseServerService {

  constructor(private http: HttpClient) { }

  getAllServers() {
    return this.http.get<ServerData>(environment.BACKEND_URL + '/api/servers');
  }

  searchServers(storageMin: Number, storageMax: Number, ram: string, hdd: string, location: string) {
    let params: HttpParams = new HttpParams();
    params = params.append('storageMin', String(storageMin));
    params = params.append('storageMax', String(storageMax));
    if (ram && ram != "") {
      params = params.append('ram', ram);
    }
    if (hdd && hdd != "") {
      params = params.append('hdd', hdd);
    }
    if (location && location != "") {
      params = params.append('location', location);
    }
    return this.http.get<ServerData>(environment.BACKEND_URL + '/api/servers', {
      params: params
    });
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { ServersRoutingModule } from './servers-routing.module';
import { ChooseServerComponent } from './choose-server/choose-server.component';


@NgModule({
  declarations: [
    ChooseServerComponent,
  ],
  imports: [
    CommonModule,
    ServersRoutingModule,
    NzTableModule,
    NzPaginationModule,
    NzSliderModule,
    NzGridModule,
    NzCheckboxModule,
    FormsModule,
    NzSpaceModule,
    NzSelectModule,
    NzButtonModule
  ]
})
export class ServersModule { }

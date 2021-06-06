import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntroRoutingModule } from './intro-routing.module';
import { IntroComponent } from './intro/intro.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [
    IntroComponent
  ],
  imports: [
    CommonModule,
    IntroRoutingModule,
    NzButtonModule,
    NzIconModule
  ]
})
export class IntroModule { }

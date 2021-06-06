import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseServerComponent } from './choose-server/choose-server.component';

const routes: Routes = [
  { path: '', component: ChooseServerComponent },
  { path: 'choose-server', component: ChooseServerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ServersRoutingModule {
}

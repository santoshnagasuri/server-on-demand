import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./intro/intro.module').then(m => m.IntroModule)
  },
  {
    path: 'servers', loadChildren: () => import('./servers/servers.module').then(m => m.ServersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

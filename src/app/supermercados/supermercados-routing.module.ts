import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupermercadosPage } from './supermercados.page';

const routes: Routes = [
  {
    path: '',
    component: SupermercadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupermercadosPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemandeCongePage } from './demande-conge.page';

const routes: Routes = [
  {
    path: '',
    component: DemandeCongePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandeCongePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemandeSortiePage } from './demande-sortie.page';

const routes: Routes = [
  {
    path: '',
    component: DemandeSortiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandeSortiePageRoutingModule {}

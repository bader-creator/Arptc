import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValiderDemandePage } from './valider-demande.page';

const routes: Routes = [
  {
    path: '',
    component: ValiderDemandePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValiderDemandePageRoutingModule {}

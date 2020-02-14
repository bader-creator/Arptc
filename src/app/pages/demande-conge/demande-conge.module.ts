import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemandeCongePageRoutingModule } from './demande-conge-routing.module';

import { DemandeCongePage } from './demande-conge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemandeCongePageRoutingModule
  ],
  declarations: [DemandeCongePage]
})
export class DemandeCongePageModule {}

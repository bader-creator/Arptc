import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemandeSortiePageRoutingModule } from './demande-sortie-routing.module';

import { DemandeSortiePage } from './demande-sortie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemandeSortiePageRoutingModule
  ],
  declarations: [DemandeSortiePage]
})
export class DemandeSortiePageModule {}

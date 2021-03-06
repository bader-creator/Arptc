import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

import { IonicModule } from '@ionic/angular';

import { DemandePageRoutingModule } from './demande-routing.module';

import { DemandePage } from './demande.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemandePageRoutingModule,
    SuperTabsModule
  ],
  declarations: [DemandePage]
})
export class DemandePageModule {}

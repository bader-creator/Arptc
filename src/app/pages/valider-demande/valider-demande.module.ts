import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

import { IonicModule } from '@ionic/angular';

import { ValiderDemandePageRoutingModule } from './valider-demande-routing.module';

import { ValiderDemandePage } from './valider-demande.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValiderDemandePageRoutingModule,
    SuperTabsModule
  ],
  declarations: [ValiderDemandePage]
})
export class ValiderDemandePageModule {}

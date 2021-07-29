import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CosmeticDetailsPageRoutingModule } from './cosmetic-details-routing.module';

import { CosmeticDetailsPage } from './cosmetic-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosmeticDetailsPageRoutingModule
  ],
  declarations: [CosmeticDetailsPage]
})
export class CosmeticDetailsPageModule {}

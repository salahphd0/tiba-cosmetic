import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CosmeticContentsPageRoutingModule } from './cosmetic-contents-routing.module';

import { CosmeticContentsPage } from './cosmetic-contents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosmeticContentsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CosmeticContentsPage]
})
export class CosmeticContentsPageModule {}

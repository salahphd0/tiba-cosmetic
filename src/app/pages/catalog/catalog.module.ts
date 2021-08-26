import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogPageRoutingModule } from './catalog-routing.module';

import { CatalogPage } from './catalog.page';
import { UtilsModule } from '../../utils/utils.module';
import { CartComponent } from 'src/app/components/cart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogPageRoutingModule,
    UtilsModule,
  ],
  declarations: [CatalogPage, CartComponent],
})
export class CatalogPageModule {}

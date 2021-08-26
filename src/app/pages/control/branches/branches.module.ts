import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BranchesPageRoutingModule } from './branches-routing.module';

import { BranchesPage } from './branches.page';
import { UtilsModule } from 'src/app/utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BranchesPageRoutingModule,
    UtilsModule,
  ],
  declarations: [BranchesPage],
})
export class BranchesPageModule {}

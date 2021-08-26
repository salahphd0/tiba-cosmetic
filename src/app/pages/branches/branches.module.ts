import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BranchesPageRoutingModule } from './branches-routing.module';

import { BranchesPage } from './branches.page';
import { ImagePickerModule } from '../../components/image-picker/image-picker.module';
import { PhoneInputModule } from '../../components/phone-input/phone-input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BranchesPageRoutingModule,
    ImagePickerModule,
    PhoneInputModule,
  ],
  declarations: [BranchesPage],
})
export class BranchesPageModule {}

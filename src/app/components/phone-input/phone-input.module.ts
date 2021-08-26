import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PhoneInputComponent } from './phone-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PhoneInputComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [PhoneInputComponent],
})
export class PhoneInputModule {}

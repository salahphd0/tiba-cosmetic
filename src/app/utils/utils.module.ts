import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../components/logo.component';
import { ErrorComponent } from '../components/error.component';
import { OtpComponent } from '../components/otp/otp.component';
import { ImagePickerModule } from '../components/image-picker/image-picker.module';
import { SingleItemComponent } from '../components/single-item/single-item.component';
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [
    LogoComponent,
    ErrorComponent,
    OtpComponent,
    SingleItemComponent,
  ],
  imports: [CommonModule, ImagePickerModule, IonicModule],
  exports: [
    LogoComponent,
    ErrorComponent,
    OtpComponent,
    ImagePickerModule,
    SingleItemComponent,
  ],
})
export class UtilsModule {}

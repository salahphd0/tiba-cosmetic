import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ImagePickerComponent } from "./image-picker.component";
import { ImageViewerModule } from "../image-viewer/image-viewer.module";

@NgModule({
  declarations: [ImagePickerComponent],
  imports: [CommonModule, IonicModule, ImageViewerModule],
  exports: [ImagePickerComponent, ImageViewerModule],
})
export class ImagePickerModule {}

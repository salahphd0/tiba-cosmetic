import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { UploaderService } from '../../services/uploader.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'image-picker',
  templateUrl: './image-picker.component.html',
  styles: [' image-viewer:not(:has(div)) {display: none !important;} '],
})
export class ImagePickerComponent implements OnInit {
  public selectedImage: string;

  @Input('multiple') multiple: boolean = false;
  @Input('path') path: string = 'default';

  @Input('images') images: string[] = [];
  @Output() imagesChange = new EventEmitter<string[] | undefined>();

  @Input('image') image: string | undefined;
  @Output() imageChange = new EventEmitter<string | undefined>();

  constructor(
    private alertService: AlertService,
    private uploaderService: UploaderService,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit() {}
  async removeImage(img: string): Promise<void> {
    await this.alertService.show();
    try {
      const ref = this.afStorage.refFromURL(img);
      ref.delete();
      if (this.multiple) {
        this.images = this.images.filter((value) => {
          return value !== img;
        });
        this.imagesChange.emit(this.images);
      } else {
        this.image = null;
        this.imageChange.emit(this.image);
      }
    } catch (err) {
      this.alertService.toast(err);
    }
    await this.alertService.dismiss();
  }
  async upload(event) {
    await this.alertService.show();
    const fs: FileList = event.target.files;
    const a = Array.from(fs);
    let i = 0;
    for await (const f of a) {
      i++;
      this.alertService.loadingElement.message = `(${i} of ${a.length}) Compressing Media...`;
      const up = await this.uploaderService.compressImage(f);
      this.alertService.loadingElement.message = `(${i} of ${a.length}) Uploading Media...`;
      const file = await this.uploaderService.upload(up, `/${this.path}/`);
      if (this.multiple) {
        this.images.push(file);
        this.imagesChange.emit(this.images);
      } else {
        this.image = file;
        this.imageChange.emit(this.image);
      }
    }
    await this.alertService.dismiss();
  }
}

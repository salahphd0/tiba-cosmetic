import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
// @ts-ignore
import imageCompression from 'browser-image-compression';

@Injectable({
  providedIn: 'root',
})
export class UploaderService {
  constructor(private storage: AngularFireStorage) {}
  async upload(media: any, path: string = '/uploads/'): Promise<string> {
    const filePath = path + Math.random().toString(36).slice(-8);
    const task = await this.storage.upload(filePath, media);
    const ref = task.ref;
    const url = await ref.getDownloadURL().then((u) => {
      return u;
    });
    return url;
  }
  async compressImage(file: File, maxWH = 1024, maxMB = 1) {
    var options = {
      maxSizeMB: maxMB,
      maxWidthOrHeight: maxWH,
    };
    const output = await imageCompression(file, options);
    return output;
  }

  validateFile(type: string): boolean {
    switch (type) {
      case 'application/pdf':
      case 'image/jpeg':
      case 'image/png':
      case 'image/heic':
        return true;
      default:
        return false;
    }
  }
}

import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}
  //#region Errors
  public async toast(message: Error | string): Promise<void> {
    const toast = await this.toastController.create({
      message: message instanceof Error ? message.message : message,
      position: 'top',
      duration: 5000,
      translucent: true,
      color: message instanceof Error ? 'danger' : 'light',
    });
    await toast?.present();
  }

  ////#endregion
  //#region Loading
  public loadingElement: HTMLIonLoadingElement;
  public async show(): Promise<void> {
    this.loadingElement = await this.loadingController.create();
    await this.loadingElement?.present();
  }
  public async dismiss(): Promise<void> {
    await this.loadingElement?.dismiss();
  }
  //#endregion
}

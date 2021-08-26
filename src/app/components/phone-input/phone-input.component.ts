import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Counteries,
  CountryPhone,
  getRawPhone,
} from 'src/app/utils/phone.util';

@Component({
  selector: 'phone-input',
  template: `
    <ion-item dir="ltr" mode="md" color="light" r>
      <ion-icon name="call-outline" slot="end"></ion-icon>
      <ion-select
        mode="ios"
        [(ngModel)]="Country"
        interface="popover"
        value="+971"
      >
        <ion-select-option *ngFor="let item of Counteries" [value]="item">{{
          item.name
        }}</ion-select-option>
      </ion-select>
      <ion-input
        [placeholder]="Country?.sample_phone"
        type="tel"
        autocomplete="tel"
        enterkeyhint="next"
        clearInput
        [debounce]="500"
        (change)="detect($event)"
      ></ion-input>
    </ion-item>
    <ng-container *ngIf="error">
      <ion-label color="danger">{{ error }}</ion-label>
    </ng-container>
  `,
})
export class PhoneInputComponent {
  public readonly Counteries = Counteries;
  public Country: CountryPhone = Counteries[0];
  @Input('phone') phone: string;
  @Output() phoneChange = new EventEmitter<string>();
  error: string;
  constructor() {}
  detect(ev) {
    try {
      const rawPhone = getRawPhone(ev.target.value, this.Country.iso);
      this.phoneChange.emit(rawPhone);
    } catch (e) {
      this.error = 'invalid phone number';
    }
  }
}

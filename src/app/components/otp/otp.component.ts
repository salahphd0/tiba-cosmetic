import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent {
  length = 6;
  @Output('onFinish') onFinish = new EventEmitter<number>();
  OTPCode = '';
  isFocused: boolean = false;
  constructor() {}

  detect(ev) {
    this.OTPCode = ev.target.value;
    if (this.OTPCode.length === this.length) {
      this.onFinish.emit(parseInt(this.OTPCode));
    }
  }
  get position(): number {
    return this.OTPCode.length;
  }
  getText(index: number): string {
    if (this.OTPCode.length > 0) {
      const code = Array.from(this.OTPCode)[index];
      if (!code) {
        const previous = Array.from(this.OTPCode)[index - 1];
        if (!previous) {
          return '';
        } else {
          return '|';
        }
      }
      return code;
    } else {
      return index === 0 ? '|' : '';
    }
  }
}

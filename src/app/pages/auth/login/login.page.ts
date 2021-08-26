import { Component, OnInit } from '@angular/core';
import { Counteries, PhoneValidator } from '../../../utils/phone.util';
import { AuthService } from '../../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { WindowService } from '../../../services/window.service';
import { MenuController } from '@ionic/angular';

enum AuthType {
  LOGIN,
  PHONE,
  OTP,
  PASS,
}

interface FormInputsProps {
  email: FormControl;
  password: FormControl;
  phone: FormControl;
  country: FormControl;
}
function SetupForm(): FormInputsProps {
  const countryControl = new FormControl(Counteries[0]);
  const emailControl = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ])
  );
  const passwordControl = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
    ])
  );
  const phoneControl = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      PhoneValidator.validCountryPhone(countryControl),
    ])
  );
  return {
    email: emailControl,
    password: passwordControl,
    phone: phoneControl,
    country: countryControl,
  };
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public readonly Counteries = Counteries;
  public readonly Type = AuthType;
  public Page: AuthType = AuthType.LOGIN;
  public readonly MainForm: FormGroup = this.formBuilder.group(SetupForm());
  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private menuController: MenuController
  ) {}
  get controls() {
    return this.MainForm.controls;
  }
  async ionViewDidEnter() {
    this.auth.initRecaptcha();
    await this.menuController.enable(false);
  }
  async ionViewDidLeave() {
    await this.menuController.enable(true);
  }
  ngOnInit() {}
  google() {
    this.auth.loginGoogle();
  }
  async submit(otp: string = undefined) {
    const values = this.MainForm.value;
    switch (this.Page) {
      case AuthType.LOGIN:
        await this.auth.loginEmail(values.email, values.password);
        break;
      case AuthType.PHONE:
      case AuthType.OTP:
        if (!otp) {
          const op = await this.auth.loginPhone(
            values.phone,
            values.country.iso,
            otp
          );
          if (op && this.Page === AuthType.PHONE) this.Page = AuthType.OTP;
        }
        break;
      case AuthType.PASS:
        await this.auth.resetPassword(values.email);
        this.Page = AuthType.LOGIN;
        break;
    }
  }
}

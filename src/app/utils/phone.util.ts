import { AbstractControl, ValidatorFn } from '@angular/forms';
import {
  PhoneNumberUtil,
  PhoneNumberFormat,
  PhoneNumberType,
} from 'google-libphonenumber';
export class CountryPhone {
  iso: string;
  name: string;
  code: string;
  sample_phone: string;
  constructor(iso: string, name: string) {
    this.iso = iso;
    this.name = name;
    const phoneUtil = PhoneNumberUtil.getInstance();
    const country_example_number = phoneUtil.getExampleNumberForType(
      this.iso,
      PhoneNumberType.MOBILE
    );
    const example_number_formatted = phoneUtil.format(
      country_example_number,
      PhoneNumberFormat.NATIONAL
    );
    this.sample_phone = example_number_formatted;
    this.code = '+' + country_example_number.getCountryCode();
  }
}
export const Counteries = [
  new CountryPhone('AE', '🇦🇪 +971'),
  new CountryPhone('SA', '🇸🇦 +966'),
  new CountryPhone('KW', '🇰🇼 +965'),
  new CountryPhone('OM', '🇴🇲 +968'),
  new CountryPhone('BH', '🇧🇭 +973'),
];

export class PhoneValidator {
  static validCountryPhone = (countryControl: AbstractControl): ValidatorFn => {
    let subscribe: boolean = false;
    return (phoneControl: AbstractControl): { [key: string]: boolean } => {
      if (!subscribe) {
        subscribe = true;
        countryControl.valueChanges.subscribe(() => {
          phoneControl.updateValueAndValidity();
        });
      }
      if (phoneControl.value !== '') {
        try {
          const phoneUtil = PhoneNumberUtil.getInstance();
          let phoneNumber = '' + phoneControl.value + '',
            region = countryControl.value.iso,
            number = phoneUtil.parse(phoneNumber, region),
            isValidNumber = phoneUtil.isValidNumber(number);
          if (isValidNumber) {
            return null;
          }
        } catch (e) {
          return {
            validCountryPhone: true,
          };
        }
        return {
          validCountryPhone: true,
        };
      } else {
        return null;
      }
    };
  };
}

export function getRawPhone(phone: string, region: string): string {
  const phoneUtil = PhoneNumberUtil.getInstance();
  if (phoneUtil.isPossibleNumberString(phone, region)) {
    const phoneNumber = phoneUtil.parse(phone, region);
    const finalPhone = phoneUtil.format(phoneNumber, PhoneNumberFormat.E164);
    return finalPhone;
  } else {
    throw new Error('Wrong phone number');
  }
}
export function getPhoneComponent(phone: string): PhoneComponant {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const phoneNumber = phoneUtil.parse(phone);
  const code = '+' + phoneNumber.getCountryCode();
  const nationalPhone = '' + phoneNumber.getNationalNumber();
  return { code, nationalPhone };
}

export interface PhoneComponant {
  nationalPhone?: string;
  code?: string;
  country?: string;
}

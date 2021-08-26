import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'error',
  template: `<ng-container *ngIf="control?.touched">
    <div class="errors">
      <ul>
        <li *ngIf="control?.errors?.required">This field is required</li>
        <li *ngIf="control?.errors?.minlength">
          Invalid input: characters count is too small
        </li>
        <li *ngIf="control?.errors?.pattern">Invlaid input</li>
        <li *ngIf="control?.errors?.validCountryPhone">Invlaid phone number</li>
      </ul>
    </div>
  </ng-container> `,
})
export class ErrorComponent {
  @Input('control') control: AbstractControl = null;
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { AccountRole, Profile } from '../models/auth.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'logger',
  template: `
    <div>
      <span>
        <img src="./assets/icon/logo-w.svg" width="50px" />
        <h4>{{ selected ? 'Enter Passcode' : 'Select profile to login' }}</h4>
      </span>
      <ion-grid *ngIf="!selected; else passcode" class="profiles" fixed>
        <ion-row *ngIf="auth.user | async as user">
          <ion-col
            *ngFor="let profile of user.profiles"
            size="6"
            size-md="3"
            size-lg="3"
          >
            <div (click)="selected = profile" class="profile">
              <img [src]="profile.thumbnail" />
              <h4>{{ profile.title }}</h4>
              <p>{{ ROLES[profile.role] }}</p>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ng-template #passcode>
        <div container>
          <ion-input
            #passinput
            class="passcode"
            type="password"
            maxlength="4"
            autofocus
            placeholder="Passcode"
            autocomplete="false"
          ></ion-input>
          <br />
          <div class="keycode">
            <div (click)="press('1', passinput)" class="key">1</div>
            <div (click)="press('2', passinput)" class="key">2</div>
            <div (click)="press('3', passinput)" class="key">3</div>
            <div (click)="press('4', passinput)" class="key">4</div>
            <div (click)="press('5', passinput)" class="key">5</div>
            <div (click)="press('6', passinput)" class="key">6</div>
            <div (click)="press('7', passinput)" class="key">7</div>
            <div (click)="press('8', passinput)" class="key">8</div>
            <div (click)="press('9', passinput)" class="key">9</div>
            <div (click)="press('C', passinput)" class="key">C</div>
            <div (click)="press('0', passinput)" class="key">0</div>
            <div (click)="press('Del', passinput)" class="key">Del</div>
            <br />
            <div (click)="press('Done', passinput)" class="key">Done</div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class LoggerComponent {
  selected: Profile;
  readonly ROLES = AccountRole;
  constructor(public auth: AuthService) {}
  press(value: string, input: IonInput) {
    const ival = input.value as string;
    if (value === 'C') {
      input.value = '';
      return;
    }
    if (value === 'Del') {
      input.value = ival.slice(0, -1);
      return;
    }
    if (value === 'Done') {
      if (ival === this.selected.passcode) {
        this.auth.loggerDone.next(true);
      } else {
        alert('Incorrect');
      }
      return;
    }
    if (ival.length >= 4) {
      return;
    }
    input.value += value;
  }
}

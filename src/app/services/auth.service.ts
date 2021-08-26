import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { debounce, first, switchMap } from 'rxjs/operators';
import { COLLECTIONS } from '../models/app.model';
import { UserModel } from '../models/auth.model';
import { AlertService } from './alert.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { WindowService } from './window.service';
import { getRawPhone } from '../utils/phone.util';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggerDone = new BehaviorSubject<boolean>(false);
  public readonly user: Observable<UserModel>;
  private windowRef: any;
  private verificationID: string;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private alertService: AlertService,
    private windowService: WindowService
  ) {
    this.user = this.afAuth.authState.pipe(
      debounce(() => interval(500)),
      switchMap((user) => {
        if (user && !user.isAnonymous) {
          this.updateUserData(user);
          return this.afs
            .collection<UserModel>(COLLECTIONS.USERS)
            .doc(user.uid)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  //#region Opertations
  public async initRecaptcha(): Promise<void> {
    if (!this.windowRef) {
      this.windowRef = this.windowService.windowRef;
      this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
        }
      );
      await this.windowRef.recaptchaVerifier.render();
    }
  }
  public async loginPhone(
    phone: string,
    iso: string,
    otp: string = undefined
  ): Promise<boolean> {
    await this.alertService.show();
    try {
      if (!otp) {
        const rawPhone = getRawPhone(phone, iso);
        const provider = new firebase.auth.PhoneAuthProvider();
        this.verificationID = await provider.verifyPhoneNumber(
          rawPhone,
          this.windowRef.recaptchaVerifier
        );
      } else {
        const cred = firebase.auth.PhoneAuthProvider.credential(
          this.verificationID,
          otp
        );
        this.afAuth.signInWithCredential(cred);
      }
      await this.alertService.dismiss();
      return true;
    } catch (e) {
      await this.alertService.dismiss();
      this.alertService.toast(e);
      return false;
    }
  }
  public async loginGoogle(): Promise<void> {
    await this.alertService.show();
    try {
      await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (e) {
      this.alertService.toast(e);
    }
    await this.alertService.dismiss();
  }
  public async loginEmail(email: string, password: string): Promise<void> {
    await this.alertService.show();
    try {
      if (email.trim().length <= 3 && password.length < 8) {
        throw new Error('Invalid email or password');
      }
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      this.alertService.toast(e);
    }
    await this.alertService.dismiss();
  }
  public async resetPassword(email: string): Promise<void> {
    await this.alertService.show();
    try {
      if (email.trim().length <= 3) {
        throw new Error('Invalid email or password');
      }
      await this.afAuth.sendPasswordResetEmail(email);
      this.alertService.toast(
        'An email already sent, Check your inbox please.'
      );
    } catch (e) {
      this.alertService.toast(e);
    }
    await this.alertService.dismiss();
  }
  public async logout(): Promise<void> {
    await this.alertService.show();
    try {
      await this.afAuth.signOut();
    } catch (e) {
      this.alertService.toast(e);
    }
    await this.alertService.dismiss();
  }
  //#endregion

  //#region OTHERS
  private activeTransaction = false;
  // Save custom user data in Firestore
  private async updateUserData(user: any = null) {
    console.log('Update started');

    try {
      if (!user) {
        const u = await this.afAuth.currentUser;
        await u.reload();
        user = await this.afAuth.currentUser;
      }
      if (!this.activeTransaction) {
        this.activeTransaction = true;
        const userRef: AngularFirestoreDocument<UserModel> = this.afs
          .collection(COLLECTIONS.USERS)
          .doc(user.uid);
        const data: UserModel = {
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          creationTime: user.metadata.creationTime,
          email: user.email,
          displayName: user.displayName,
        };
        await userRef.set(data, { merge: true });
        this.activeTransaction = false;
        return;
      } else {
        throw new Error('Active Transaction');
      }
    } catch (e) {
      console.log(e);
    }
  }
  public async getCurrentUser(): Promise<UserModel> {
    return this.user.pipe(first()).toPromise();
  }
  public async isLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }
  //#endregion
}

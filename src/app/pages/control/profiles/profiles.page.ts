import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { COLLECTIONS } from 'src/app/models/app.model';
import { AccountRole, Profile, UserModel } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
})
export class ProfilesPage implements OnInit {
  activeProfile: Profile = {
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/tamwenat-app.appspot.com/o/profiles%2F5smbqedy?alt=media&token=da2fbfaf-2e45-45e6-a149-a4080fb8816a',
  };
  readonly ROLES = AccountRole;
  constructor(public auth: AuthService, private afStore: AngularFirestore) {
    console.log(this.ROLES);
  }

  ngOnInit() {}
  async add(user: UserModel) {
    try {
      await this.afStore
        .collection<UserModel>(COLLECTIONS.USERS)
        .doc(user.uid)
        .set(
          {
            profiles: firebase.firestore.FieldValue.arrayUnion(
              this.activeProfile
            ),
          },
          { merge: true }
        );
    } catch (error) {
      console.log(error);
    }
  }
}

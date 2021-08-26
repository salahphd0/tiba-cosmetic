import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { COLLECTIONS } from 'src/app/models/app.model';
import { AccountRole } from 'src/app/models/auth.model';
import { BranchModel } from 'src/app/models/branch.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.page.html',
  styleUrls: ['./branches.page.scss'],
})
export class BranchesPage implements OnInit {
  currentBranch: BranchModel = {};
  branches: Observable<BranchModel[]>;
  constructor(private afStore: AngularFirestore, private auth: AuthService) {}
  async ngOnInit() {
    const user = await this.auth.getCurrentUser();
    this.branches = this.afStore
      .collection<BranchModel>(COLLECTIONS.USERS, (ref) =>
        ref
          .where('mainUser', '==', user.uid)
          .where('role', '==', AccountRole.RESTAURANT)
      )
      .valueChanges({ idField: 'uid' });
  }
  async add() {}
}

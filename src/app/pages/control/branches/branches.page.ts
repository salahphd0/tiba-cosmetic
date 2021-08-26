import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Branch, Profile } from 'src/app/models/auth.model';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.page.html',
  styleUrls: ['./branches.page.scss'],
})
export class BranchesPage implements OnInit {
  activeBranch: Branch = {};
  constructor(private afStore: AngularFirestore) {}

  ngOnInit() {}
  async add() {
    try {
    } catch (error) {
      console.log(error);
    }
  }
}

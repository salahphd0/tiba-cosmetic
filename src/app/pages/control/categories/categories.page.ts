import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { COLLECTIONS } from 'src/app/models/app.model';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  activeCategory: Category = { active: true };
  categories: Observable<Category[]>;
  private readonly refrenece = this.afStore.collection<Category>(
    COLLECTIONS.CATEGORIES
  );
  constructor(private afStore: AngularFirestore) {}
  ngOnInit() {
    this.categories = this.refrenece.valueChanges({ idField: 'uid' });
  }
  async add() {
    try {
      await this.refrenece.add(this.activeCategory);
      this.activeCategory = {};
    } catch (e) {
      console.log(e);
    }
  }
  // TODO: #1 Add Edit Category
  // async edit() {
  //   try {
  //     await this.refrenece.add({...this.activeCategory, active: true});
  //     this.activeCategory = {};
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  // TODO: #2 Add Toggle Active Category
  // async toggle(uid: string, currentState: boolean) {
  //   try {
  //     await this.refrenece.doc(uid).update({ active: !currentState });
  //     this.activeCategory = {};
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
}
